import { React, createContext, useState } from "react";

export const SchemaContext = createContext();

const SchemaContextProvider = ({ children }) => {
  const [schema, setSchema] = useState("");
  const saveSchema = (schema) => {
    setSchema(schema);
  };
  return (
    <SchemaContext.Provider value={{ schema, setSchema, saveSchema }}>
      {children}
    </SchemaContext.Provider>
  );
};

export default SchemaContextProvider;
