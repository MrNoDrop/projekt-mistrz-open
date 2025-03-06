import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getCollectionEntry,
  createCollectionEntry,
  getCollection,
} from "../firebase/firestore";
import "./pageVisitorsMonitor.scss";

const mapStateToProps = ({ state }) => ({
  fingerprint: state.authentication.fingerprint,
});

function PageVisitorsMonitor({ fingerprint }) {
  const [visitors, setVisitors] = useState(undefined);
  useEffect(() => {
    if (fingerprint == null) return;
    (async () => {
      const entry = await getCollectionEntry("fingerprints", fingerprint);
      if (entry == null) {
        createCollectionEntry(
          "fingerprints",
          { played: [] },
          fingerprint
        ).catch(console.error);
      }
      getCollection("fingerprints").then((fingerprints) =>
        setVisitors(fingerprints.length)
      );
    })();
  }, [fingerprint]);
  return <div className="visitor-counter">Visiteurs uniques: {visitors}</div>;
}

export default connect(mapStateToProps)(PageVisitorsMonitor);
