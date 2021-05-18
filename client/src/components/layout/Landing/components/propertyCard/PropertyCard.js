import React from "react";

const PropertyCard = ({ property, active }) => {
  return (
    <div className={"card property " + (active ? "active" : "")}>
      <img src={property.image} alt="" />
      <div className="meta">
        <span className="property-title">{property.title}</span>
        <p>{property.description}</p>
        <span className={"availability " + property.color}>
          {property.availability}
        </span>
      </div>
    </div>
  );
};

export default PropertyCard;
