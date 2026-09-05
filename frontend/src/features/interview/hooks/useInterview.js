import { generateInterviewReport, getInterviewReportById, getAllInterviewReports } from "../services/interview.api.js";
import { useContext } from "react";
import InterviewContext from "../interview.context";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error("InterviewProvider not found");
    }
    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile, resume }) => {
        setLoading(true);
        try {
            const response = await generateInterviewReport({
                jobDescription,
                selfDescription,
                resumeFile: resumeFile || resume
            });
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (error) {
            console.error("Error generating interview report:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getReportById = async (interviewId) => {
        setLoading(true);
        try {
            const response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (error) {
            console.error("Error getting interview report by id:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getReports = async () => {
        setLoading(true);
        try {
            const response = await getAllInterviewReports();
            setReports(response.interviewReports || response.data);
            return response.interviewReports || response.data;
        } catch (error) {
            console.error("Error getting interview reports:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        report,
        setReport,
        reports,
        generateReport,
        getReportById,
        getInterviewReportById: getReportById,
        getReports
    };
};

export default useInterview;