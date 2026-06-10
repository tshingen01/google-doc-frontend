import { useEffect, useState } from "react";
import API from "../api/axios";

export default function useDocuments() {
  const [documents, setDocuments] = useState({
    ownedDocuments: [],
    sharedDocuments: [],
  });

  const loadDocuments = async () => {
    try {
      const res = await API.get("/documents");
      setDocuments(res.data);
    } catch (err) {
      console.error("Failed to load documents:", err);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  return {
    documents,
    refreshDocuments: loadDocuments,
  };
}