import React, { useEffect, useState } from "react";
import { checkRoom } from "../../../../actions/reserveActions";

const RoomCard = ({ room, active }) => {
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    checkRoom(room.id).then((val) => {
      setAvailable(val);
    });
  }, []);

  return (
    <div className={"card room " + (active ? "active" : "")}>
      <img src={room.image} alt="" />

      <div className="meta">
        <div className="titles">
          <strong>Room Features</strong>
          {available && <span className="right green-text">Now available</span>}
          {!available && (
            <span className="right red-text">Not available right now</span>
          )}
        </div>

        {room.features.map((feature) => (
          <div className="prop">
            <span class="left">{feature.key}</span>
            <span
              class={
                "right " + (feature.value === "No" ? "red-text" : "green-text")
              }
              dangerouslySetInnerHTML={{ __html: feature.value }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomCard;
