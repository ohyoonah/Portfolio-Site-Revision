import React, {useState} from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({education, setEducations, isEditable}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          key={education.eduId}
          currentEducation={education}
          setEducations={setEducations}
          setIsEditing={setIsEditing}
        />
      ) : (
        <EducationCard
          key={education.eduId}
          education={education}
          isEditable={isEditable}
          setEducations={setEducations}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Education;