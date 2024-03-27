"use client";

import { useEffect, useState } from "react";
import Tag from "../../components/Tag";

export default function User({ params }) {
  const [tag, setTag] = useState([]);

  const tagId = params.tagId;

  useEffect(() => {
    fetch(`/api/tags/${tagId}`)
      .then((res) => res.json())
      .then((data) => setTag(data));
  }, []);

  return (
    <main>
      <div className="py-20 max-w-4xl mx-auto flex flex-col space-y-4">
        {tag ? <Tag key={tag._id} tagInfo={tag} /> : ""}
      </div>
    </main>
  );
}
