import { useEffect, useState } from "react";
import API from "../api/axios";

export default function useDocuments() {
  const [documents, setDocuments] = useState({
    ownedDocuments: [],
    sharedDocuments: [],
  });

  const loadDocuments = async () => {
    const res = await API.get("/documents");
    setDocuments(res.data);
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  return {
    documents,
    refreshDocuments: loadDocuments,
  };
}