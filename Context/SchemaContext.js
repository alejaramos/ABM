import { React, createContext, useState } from "react";

export const SchemaContext = createContext();

const SchemaContextProvider = ({ children }) => {
  const [modified, setModified] = useState(true);
  const saveModified = (modified) => {
    setModified(!modified);
  };

  const [schema, setSchema] = useState("");
  const saveSchema = (schema) => {
    setSchema(schema);
  };
  return (
    <SchemaContext.Provider
      value={{
        schema,
        setSchema,
        saveSchema,
        modified,
        setModified,
        saveModified,
      }}
    >
      {children}
    </SchemaContext.Provider>
  );
};

export default SchemaContextProvider;
