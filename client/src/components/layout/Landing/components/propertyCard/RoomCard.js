import React from "react";

const RoomCard = ({ room, active }) => {
  return (
    <div className={"card room " + (active ? "active" : "")}>
      <img src={room.image} alt="" />

      <div className="meta">
        <div className="titles">
          <strong>Room Features</strong>
          {room.available && (
            <span className="right green-text">Now available</span>
          )}
          {!room.available && (
            <span className="right red-text">Not available right now</span>
          )}
        </div>

        {room.features.map((feature) => (
          <div className="prop">
            <span class="left">{feature.key}</span>
            <span class={"right " + feature.color}>{feature.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomCard;
