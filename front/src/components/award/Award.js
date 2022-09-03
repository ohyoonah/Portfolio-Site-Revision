import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

function Award({ Award, setAward, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <AwardEditForm
          key={Award.awardId}
          currentAward={Award}
          setAward={setAward}
          setIsEditing={setIsEditing}
        />
      ) : (
        <AwardCard
          key={Award.awardId}
          award={Award}
          setAward={setAward}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Award;
