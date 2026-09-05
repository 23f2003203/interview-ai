import React, { useState, useRef, useEffect } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview'
import { useAuth } from '../../auth/hooks/useAuth'
import { useNavigate } from 'react-router';
import Logo from '../../../components/Logo'

const Home = () => {
    const { loading, generateReport, reports, getReports } = useInterview();
    const { user, handleLogout } = useAuth();
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [selectedFileName, setSelectedFileName] = useState("");
    const resumeInputRef = useRef();

    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        await handleLogout();
        navigate('/login', { replace: true });
    };

    useEffect(() => {
        getReports();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFileName(e.target.files[0].name);
        }
    };

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current?.files?.[0];
        if (!jobDescription) {
            alert("Please enter a job description.");
            return;
        }
        if (!resumeFile) {
            alert("Please upload a resume file.");
            return;
        }

        try {
            const data = await generateReport({
                jobDescription,
                selfDescription,
                resumeFile
            });
            if (data?._id) {
                navigate(`/interview/${data._id}`);
            }
        } catch (err) {
            console.error("Failed to generate report:", err);
            alert("Failed to generate report. Please try again.");
        }
    };

    return (
        <main className="job-portal-main">
            <header className="portal-header">
                <div className="header-text">
                    <Logo size="medium" />
                    <p className="portal-subtitle" style={{ marginTop: '0.35rem' }}>Welcome back, <span className="user-highlight">{user?.username || 'User'}</span>! Submit your details below to proceed.</p>
                </div>
                <div className="header-actions">
                    <div className="user-profile-badge">
                        <div className="user-avatar">
                            {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span className="user-name">{user?.username || 'User'}</span>
                    </div>
                    <button className="logout-btn" onClick={handleLogoutClick} title="Logout of your account">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </div>
            </header>

            <div className="portal-card">
                {/* Left Column: Job Description */}
                <div className="portal-column left-column">
                    <div className="section-header">
                        <span className="section-tag">Job Description Input</span>
                        <h2 className="section-title">1. Enter Job Description</h2>
                    </div>
                    <div className="textarea-container">
                        <textarea
                            onChange={(e) => setJobDescription(e.target.value)}
                            value={jobDescription}
                            name="jobDescription"
                            id="jobDescription"
                            placeholder="Paste or type the job title, key responsibilities, requirements, and responsibilities here..."
                        />
                        <div className="char-counter">{jobDescription.length} / 5000</div>
                    </div>
                </div>

                {/* Vertical Divider */}
                <div className="portal-divider" />

                {/* Right Column: File Upload & Self Description */}
                <div className="portal-column right-column">
                    {/* File Upload Section */}
                    <div className="section-block upload-section">
                        <div className="section-header">
                            <span className="section-tag">File Upload Zone</span>
                            <h2 className="section-title">2. Upload Resume/CV</h2>
                        </div>
                        <label className="upload-dropzone" htmlFor="resumeUpload">
                            <input
                                ref={resumeInputRef}
                                onChange={handleFileChange}
                                type="file"
                                id="resumeUpload"
                                name="resume"
                                accept=".pdf,.docx"
                                hidden
                            />
                            <div className="upload-icon">
                                <svg
                                    width="36"
                                    height="36"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                                    <path d="M12 12v9" />
                                    <path d="m16 16-4-4-4 4" />
                                </svg>
                            </div>
                            <p className="dropzone-primary-text">
                                {selectedFileName ? `Selected: ${selectedFileName}` : "Drag & Drop File Here"}
                            </p>
                            <p className="dropzone-secondary-text">or click to select file from device</p>
                            <p className="dropzone-hint">Accepted: PDF, DOCX (Max 5MB)</p>
                        </label>
                    </div>

                    {/* Self Description Section */}
                    <div className="section-block self-desc-section">
                        <div className="section-header">
                            <span className="section-tag">Self Description Input</span>
                            <h2 className="section-title">3. Write Self Description</h2>
                        </div>
                        <div className="textarea-container">
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                value={selfDescription}
                                name="selfDescription"
                                id="selfDescription"
                                placeholder="Introduce yourself, highlight your skills, and explain your fit for this role..."
                            />
                            <div className="char-counter">{selfDescription.length} / 1000 characters</div>
                        </div>
                    </div>

                    {/* Submit Action */}
                    <div className="action-row">
                        <button
                            disabled={loading}
                            onClick={handleGenerateReport}
                            type="button"
                            className="submit-button"
                        >
                            {loading ? "Analyzing your skills and the job description..." : "Generate Report"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent report section */}
            <div className="recent-reports-section">
                <div className="section-header-row">
                    <h2 className="section-title">Recent Reports</h2>
                    {reports && reports.length > 0 && (
                        <span className="reports-count">{reports.length} {reports.length === 1 ? 'Report' : 'Reports'}</span>
                    )}
                </div>

                {reports && reports.length > 0 ? (
                    <div className="report-list">
                        {reports.map((report) => (
                            <div
                                key={report._id}
                                className="report-card"
                                onClick={() => navigate(`/interview/${report._id}`)}
                            >
                                <div className="card-header">
                                    <h3 className="report-title">{report.title || "Interview Report"}</h3>
                                    {report.matchScore !== undefined && (
                                        <span className="match-score-badge">{report.matchScore}% Match</span>
                                    )}
                                </div>
                                {report.createdAt && (
                                    <p className="report-date">
                                        Created on {new Date(report.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-reports">
                        <p>No recent reports found. Submit your details above to generate a report!</p>
                    </div>
                )}
            </div>
        </main>
    )
}

export default Home
