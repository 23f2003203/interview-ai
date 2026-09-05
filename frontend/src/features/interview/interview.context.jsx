import { createContext, useMemo, useState } from "react";

const InterviewContext = createContext()

export const InterviewProvider = ({ children }) => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reports, setReports] = useState([]);

    return (
        <InterviewContext.Provider value={{ loading, setLoading, report, setReport, reports, setReports }}>
            {children}
        </InterviewContext.Provider>
    );
}

export default InterviewContext;