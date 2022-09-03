import React, { useState } from "react";
import CertificateEditForm from "./CertificateEditForm";
import CertificateCard from "./CertificateCard";

function Certificate({ certificate, getCertificates, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          key={certificate.certificateId}
          currentCertificate={certificate}
          getCertificates={getCertificates}
          setIsEditing={setIsEditing}
        />
      ) : (
        <CertificateCard
          key={certificate.certificateId}
          certificate={certificate}
          isEditable={isEditable}
          getCertificates={getCertificates}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Certificate;
