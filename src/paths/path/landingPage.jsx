import React from "react";

import Videos from "../../components/videos";
import PageVisitorsMonitor from "../../components/pageVisitorsMonitor";

function LandingPage() {
  return (
    <div>
      <PageVisitorsMonitor />
      <Videos />
    </div>
  );
}

export default LandingPage;
