import React, { useEffect, useState } from "react";
import gametime from "../apis/gametime.js";
import "./App.css";
import EventList from "./EventList";
import Logo from "./Logo";
import Search from "./Search";
// import EventItem from "/EventItem";

const App = () => {
  const [results, setResults] = useState([]);
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  const updateSearchTerm = (term) => {
    setTerm(term);
  };

  useEffect(() => {
    if (term === "") {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    if (debouncedTerm === "") return;

    const search = async () => {
      const res = await gametime.get("/search", {
        params: {
          query: debouncedTerm,
        },
      });

      if (res.status != 200) {
        setResults([]);
        return;
      }

      const filteredEvents = [];
      const { events, performers, venues } = res.data;

      for (let i = 0; i < Math.min(3, events.length); ++i) {
        const { event, venue, performers } = events[i];
        const tmp = {};
        tmp["id"] = event.id;
        tmp["title"] = event.name;
        tmp["image"] = performers[0].hero_image_url;
        tmp["subtitle"] = venue.name;
        filteredEvents.push(tmp);
      }

      for (let i = 0; i < Math.min(3, performers.length); ++i) {
        const { id, hero_image_url, name, category } = performers[i];
        const tmp = {};
        tmp["id"] = id;
        tmp["title"] = name;
        tmp["image"] = hero_image_url;
        tmp["subtitle"] = category;
        filteredEvents.push(tmp);
      }

      for (let i = 0; i < Math.min(3, venues.length); ++i) {
        const { id, image_url, name, city } = venues[i];
        const tmp = {};
        tmp["id"] = id;
        tmp["title"] = name;
        tmp["image"] = image_url;
        tmp["subtitle"] = city;
        filteredEvents.push(tmp);
      }

      setResults(filteredEvents);
    };

    search();
  }, [debouncedTerm]);

  return (
    <>
      <div className="main-wrapper">
        <Logo
          className="svg-logo"
          textFillColor="#000"
          url={"https://gametime.co/"}
        />
        <Search
          hasResults={results.length > 0}
          updateSearchTerm={updateSearchTerm}
          term={term}
        />
        <EventList results={results} />
      </div>
    </>
  );
};

export default App;
