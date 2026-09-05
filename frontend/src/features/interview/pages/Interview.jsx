import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview'
import { useAuth } from '../../auth/hooks/useAuth'
import Logo from '../../../components/Logo'

const Interview = () => {
    const { interviewId } = useParams()
    const { report, getReportById, getInterviewReportById, loading } = useInterview()
    const { user, handleLogout } = useAuth()
    const fetchReport = getReportById || getInterviewReportById
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('technical')
    const [completedTasks, setCompletedTasks] = useState({})

    const handleLogoutClick = async () => {
        await handleLogout();
        navigate('/login', { replace: true });
    };

    useEffect(() => {
        if (interviewId && (!report || report._id !== interviewId)) {
            if (fetchReport) {
                fetchReport(interviewId)
            }
        }
    }, [interviewId])

    const toggleTask = (dayIndex, taskIndex) => {
        const key = `${dayIndex}-${taskIndex}`
        setCompletedTasks((prev) => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    const technicalCount = report?.technicalQuestions?.length || 0
    const behavioralCount = report?.behavioralQuestions?.length || 0
    const planCount = report?.preparationPlan?.length || 0
    const matchScore = report?.matchScore ?? 0

    const skillChips = report?.skillGaps?.map(sg => sg.skill) || ['redis', 'Message queue', 'Event loop', 'React', 'MongoDB', 'System Design']

    if (loading || !report) {
        return (
            <main className="interview-main">
                <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                    <h2>{loading ? "Loading your Interview Readiness Report..." : "No Interview Report found."}</h2>
                    {!loading && (
                        <button className="back-btn" onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
                            Back to Application
                        </button>
                    )}
                </div>
            </main>
        )
    }

    return (
        <main className="interview-main">
            {/* Dashboard Top Header */}
            <header className="dashboard-header">
                <div className="header-left">
                    <button className="back-btn" onClick={() => navigate('/')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                    <Logo size="small" />
                </div>

                <div className="header-right">
                    <div className="user-profile-badge">
                        <div className="user-avatar">
                            {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span className="user-name">{user?.username || 'User'}</span>
                    </div>
                    <div className="match-score-badge">
                        <div className="score-circle">
                            <span>{matchScore}%</span>
                        </div>
                        <span className="score-text">{matchScore}% Match Score</span>
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

            {/* Main 3-Column Portal Container (Matching Image Wireframe) */}
            <div className="interview-portal-card">
                {/* COLUMN 1: LEFT SIDEBAR (Navigation Tabs) */}
                <aside className="portal-column left-sidebar">
                    <div className="nav-header">Navigation</div>
                    <nav className="nav-menu">
                        <button
                            type="button"
                            className={`nav-item ${activeTab === 'technical' ? 'active' : ''}`}
                            onClick={() => setActiveTab('technical')}
                        >
                            <div className="nav-item-content">
                                <span className="nav-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                                    </svg>
                                </span>
                                <span>Technical questions</span>
                            </div>
                            <span className="nav-badge">{technicalCount}</span>
                        </button>

                        <button
                            type="button"
                            className={`nav-item ${activeTab === 'behavioral' ? 'active' : ''}`}
                            onClick={() => setActiveTab('behavioral')}
                        >
                            <div className="nav-item-content">
                                <span className="nav-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                </span>
                                <span>Behavioral questions</span>
                            </div>
                            <span className="nav-badge">{behavioralCount}</span>
                        </button>

                        <button
                            type="button"
                            className={`nav-item ${activeTab === 'roadmap' ? 'active' : ''}`}
                            onClick={() => setActiveTab('roadmap')}
                        >
                            <div className="nav-item-content">
                                <span className="nav-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                                        <polyline points="2 17 12 22 22 17" />
                                        <polyline points="2 12 12 17 22 12" />
                                    </svg>
                                </span>
                                <span>Road Map</span>
                            </div>
                            <span className="nav-badge">{planCount} Days</span>
                        </button>
                    </nav>
                </aside>

                {/* VERTICAL DIVIDER 1 */}
                <div className="portal-divider" />

                {/* COLUMN 2: MIDDLE MAIN CONTENT AREA */}
                <section className="portal-column main-content">
                    {activeTab === 'technical' && (
                        <div>
                            <div className="content-header">
                                <span className="content-tag">Technical Assessment</span>
                                <h2 className="content-title">Technical Questions</h2>
                                <p className="content-description">
                                    Tailored questions focusing on system design, state management, and backend scalability.
                                </p>
                            </div>

                            <div className="questions-list">
                                {report.technicalQuestions?.map((q, idx) => (
                                    <article key={idx} className="question-card">
                                        <div className="q-header">
                                            <span className="q-number">Q{idx + 1}</span>
                                            <h3 className="q-text">{q.question}</h3>
                                        </div>

                                        <div className="q-section intention-section">
                                            <div className="q-label">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="12" y1="16" x2="12" y2="12" />
                                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                                </svg>
                                                Intention
                                            </div>
                                            <p>{q.intention}</p>
                                        </div>

                                        <div className="q-section answer-section">
                                            <div className="q-label">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                Suggested Answer Strategy
                                            </div>
                                            <p>{q.answer}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'behavioral' && (
                        <div>
                            <div className="content-header">
                                <span className="content-tag">Behavioral Assessment</span>
                                <h2 className="content-title">Behavioral Questions</h2>
                                <p className="content-description">
                                    Scenario-based questions assessing teamwork, problem-solving, and adaptability under pressure.
                                </p>
                            </div>

                            <div className="questions-list">
                                {report.behavioralQuestions?.map((q, idx) => (
                                    <article key={idx} className="question-card">
                                        <div className="q-header">
                                            <span className="q-number">BQ{idx + 1}</span>
                                            <h3 className="q-text">{q.question}</h3>
                                        </div>

                                        <div className="q-section intention-section">
                                            <div className="q-label">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="12" y1="16" x2="12" y2="12" />
                                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                                </svg>
                                                Intention
                                            </div>
                                            <p>{q.intention}</p>
                                        </div>

                                        <div className="q-section answer-section">
                                            <div className="q-label">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                </svg>
                                                STAR Response Blueprint
                                            </div>
                                            <p>{q.answer}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'roadmap' && (
                        <div>
                            <div className="content-header">
                                <span className="content-tag">Preparation Schedule</span>
                                <h2 className="content-title">Preparation Road Map</h2>
                                <p className="content-description">
                                    A structured day-by-day learning schedule to bridge skill gaps and master interview topics.
                                </p>
                            </div>

                            <div className="roadmap-container">
                                {report.preparationPlan?.map((plan, dayIdx) => (
                                    <div key={plan._id || dayIdx} className="roadmap-day-card">
                                        <div className="day-header">
                                            <span className="day-badge">Day {plan.day}</span>
                                            <h3 className="day-focus">{plan.focus}</h3>
                                        </div>

                                        <div className="task-list">
                                            {plan.tasks?.map((task, taskIdx) => {
                                                const isDone = !!completedTasks[`${dayIdx}-${taskIdx}`]
                                                return (
                                                    <label key={taskIdx} className="task-item">
                                                        <input
                                                            type="checkbox"
                                                            checked={isDone}
                                                            onChange={() => toggleTask(dayIdx, taskIdx)}
                                                        />
                                                        <span className={isDone ? 'completed' : ''}>{task}</span>
                                                    </label>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* VERTICAL DIVIDER 2 */}
                <div className="portal-divider" />

                {/* COLUMN 3: RIGHT SIDEBAR (Skill Gaps & Tags) */}
                <aside className="portal-column right-sidebar">
                    {/* Skill Gaps Widget Header */}
                    <div className="widget-section">
                        <h3 className="widget-title">
                            Skill Gaps
                            <span className="widget-count">{report.skillGaps?.length || 0}</span>
                        </h3>

                        {/* Keyword Chips */}
                        <div className="skill-chips-container">
                            {skillChips.map((chip, idx) => (
                                <span key={idx} className="skill-chip">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                    {chip}
                                </span>
                            ))}
                        </div>

                        {/* Detailed Skill Gaps List */}
                        <div className="skill-gap-list">
                            {report.skillGaps?.map((sg, idx) => (
                                <div key={idx} className="skill-gap-card">
                                    <div className="skill-name">{sg.skill}</div>
                                    <span className={`severity-badge ${sg.severity}`}>
                                        {sg.severity} priority
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Focus Tip Card */}
                    <div className="summary-card">
                        <h4 className="summary-title">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4M12 8h.01" />
                            </svg>
                            Interview Strategy Tip
                        </h4>
                        <p className="summary-text">
                            Focus heavily on high-severity skill gaps during Day 1 & Day 2 of your Road Map to maximize match confidence.
                        </p>
                    </div>
                </aside>
            </div>
        </main>
    )
}

export default Interview