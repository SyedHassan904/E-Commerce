import "./dashboard.css"
import React from "react"

export default function Dashboard(){
    const stats = [
        { label: "Total Sales", value: "$48,920", sub: "+12% vs last week" },
        { label: "Orders", value: "1,234", sub: "+4%" },
        { label: "Customers", value: "8,431", sub: "+2%" },
        { label: "Refunds", value: "$1,240", sub: "-8%" },
    ];

    const activities = [
        { title: "Order #10213 delivered", time: "2m ago" },
        { title: "New product added: Summer Tee", time: "1h ago" },
        { title: "User Jane rated a product 5★", time: "3h ago" },
        { title: "Order #10202 refunded", time: "5h ago" },
    ];

    return(
        <>
            <div className="adminDashboard">
                <div className="dbHeader">
                    <div>
                        <h1>Dashboard</h1>
                        <p className="dbSubtitle">Overview of your store performance</p>
                    </div>
                    <div className="dbHeaderActions">
                        <button className="dbBtn ghost">Export</button>
                        <button className="dbBtn primary">New campaign</button>
                    </div>
                </div>

                <div className="statsGrid">
                    {stats.map((s, i) => (
                        <div key={i} className="card statCard">
                            <p className="statLabel">{s.label}</p>
                            <h2 className="statValue">{s.value}</h2>
                            <p className="statSub">{s.sub}</p>
                        </div>
                    ))}
                </div>

                <div className="chartsGrid">
                    <div className="card chartCard">
                        <div className="cardHead">
                            <h3>Revenue</h3>
                            <p className="muted">Last 12 months</p>
                        </div>
                        <div className="fakeChart" aria-hidden="true">
                            <div className="bar" style={{height: '40%'}} />
                            <div className="bar" style={{height: '65%'}} />
                            <div className="bar" style={{height: '55%'}} />
                            <div className="bar" style={{height: '80%'}} />
                            <div className="bar" style={{height: '45%'}} />
                            <div className="bar" style={{height: '70%'}} />
                            <div className="bar" style={{height: '60%'}} />
                            <div className="bar" style={{height: '85%'}} />
                            <div className="bar" style={{height: '50%'}} />
                            <div className="bar" style={{height: '75%'}} />
                            <div className="bar" style={{height: '66%'}} />
                            <div className="bar" style={{height: '90%'}} />
                        </div>
                    </div>
                    <div className="card chartCard">
                        <div className="cardHead">
                            <h3>Top categories</h3>
                            <p className="muted">This month</p>
                        </div>
                        <ul className="topList">
                            <li><span>Women</span><span>42%</span></li>
                            <li><span>Men</span><span>33%</span></li>
                            <li><span>Kids</span><span>15%</span></li>
                            <li><span>Accessories</span><span>10%</span></li>
                        </ul>
                    </div>
                </div>

                <div className="rowsGrid">
                    <div className="card recentCard">
                        <div className="cardHead">
                            <h3>Recent activity</h3>
                        </div>
                        <ul className="activityList">
                            {activities.map((a, i) => (
                                <li key={i}>
                                    <span>{a.title}</span>
                                    <span className="muted">{a.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="card quickCard">
                        <div className="cardHead">
                            <h3>Quick actions</h3>
                        </div>
                        <div className="quickGrid">
                            <button className="qaBtn">Create product</button>
                            <button className="qaBtn">View orders</button>
                            <button className="qaBtn">Discounts</button>
                            <button className="qaBtn">Invite staff</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}