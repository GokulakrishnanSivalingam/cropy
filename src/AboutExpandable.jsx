import React, { useState } from "react";

const MAX_ABOUT_LENGTH = 200;

function AboutExpandable({ about }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = about.length > MAX_ABOUT_LENGTH;
  const shortAbout = isLong ? about.slice(0, MAX_ABOUT_LENGTH) + "..." : about;

  return (
    <span style={{ whiteSpace: 'pre-line' }}>
      {expanded || !isLong ? about : shortAbout}
      {isLong && (
        <span
          className="read-more"
          style={{ color: "#1877f2", cursor: "pointer", fontWeight: 600, marginLeft: 4 }}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? " Show less" : " Read more"}
        </span>
      )}
    </span>
  );
}

export default AboutExpandable;