import React, { useState } from "react";
import {
	CDBSidebar,
	CDBSidebarContent,
	CDBSidebarFooter,
	CDBSidebarHeader,
	CDBSidebarMenu,
	CDBSidebarMenuItem
} from "cdbreact";

import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { DashboardOrganization } from "./dashboardOrganization";
import { RegisterPerson } from "./registerPerson";
import "../../styles/dashboard.scss";

export const Dashboard = () => {
	const [activeTab, setActiveTab] = useState("1");
	const toggle = tab => {
		if (activeTab !== tab) setActiveTab(tab);
	};
	return (
		<div className="dashboard container-fluid">
			<div className="row">
				<div className="col-12 col-md-4">
					<CDBSidebar className="sidebar">
						<CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
							<a href="/">Sidebar</a>
						</CDBSidebarHeader>

						<CDBSidebarContent className="sidebar-content">
							<CDBSidebarMenu>
								<NavLink
									className={classnames({ active: activeTab === "1" })}
									onClick={() => {
										toggle("1");
									}}>
									<CDBSidebarMenuItem icon="fas fa-user fa-2x">Perfil</CDBSidebarMenuItem>
								</NavLink>
								<NavLink
									className={classnames({ active: activeTab === "2" })}
									onClick={() => {
										toggle("2");
									}}>
									<CDBSidebarMenuItem icon="fas fa-user-secret fa-2x">
										Datos de Acceso
									</CDBSidebarMenuItem>
								</NavLink>
								<NavLink
									className={classnames({ active: activeTab === "3" })}
									onClick={() => {
										toggle("3");
									}}>
									<CDBSidebarMenuItem className="mr-2" icon="fas fa-hands-helping fa-2x">
										Profile page 3
									</CDBSidebarMenuItem>
								</NavLink>
							</CDBSidebarMenu>
						</CDBSidebarContent>

						<CDBSidebarFooter className="sidebar-footer">
							<div>Sidebar Footer</div>
						</CDBSidebarFooter>
					</CDBSidebar>
				</div>
				<div className="col-12 col-md-8">
					<TabContent className="content" activeTab={activeTab}>
						<TabPane tabId="1">
							<div className="row">
								<div className="col-12 bg-white">
									<RegisterPerson />
								</div>
							</div>
						</TabPane>
						<TabPane tabId="2">Hola tab 2</TabPane>
						<TabPane tabId="3">Hola tab 3</TabPane>
					</TabContent>
				</div>
			</div>
		</div>
	);
};
