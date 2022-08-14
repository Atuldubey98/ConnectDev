import React,{useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileUpdates = () => {
	const { user } = useSelector((state) => state.user);
	const { loading, profile, error } = useSelector((state) => state.profile);
	const profileNav = Object.keys(profile).filter(
		(nav) => nav !== "_id" && nav !== "user" && nav !== "__v" && nav!=='date'
	);
	const [selectNav, setSelectNav]=useState(1);
	return (
		<div className="col-md-7">
			<div className="d-flex align-items-center justify-content-center bg-light p-3 rounded">
				<img
					src={
						user.avatar
							? "http://localhost:9000" + user.avatar
							: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3u0UEA-Gfpsphl2gdxxbhnVoJ1NP_o0LV3Q&usqp=CAU"
					}
					className="rounded-circle mr-2 border border-5 border-success"
					style={{ width: "200px" }}
					alt="Avatar"
				/>
				<div className="container">
					<h3 className="fs-3 text-capitalize">{user?.name}</h3>
					<h3 className="fs-3">{user?.email}</h3>
				</div>
				<div className="container">
					<button className="btn btn-primary">
						<i className="fa-solid fa-pencil"></i>Edit Profile
					</button>
				</div>
			</div>
			<div className="card text-center">
				<div className="card-header">
					<ul className="nav nav-tabs card-header-tabs">
						{profileNav.map((nav) => (
							<li key={nav} className="nav-item">
								<span
									className="nav-link text-capitalize"
									to="#"
									tabindex="-1"
									aria-disabled="true"
								>
									{nav}
								</span>
							</li>
						))}
					</ul>
				</div>
				<div className="card-body">
					<h5 className="card-title">Skills</h5>
					<ul className="d-flex flex-wrap">
						<li className="col-md-6">
							Java
						</li>
						<li className="col-md-6 ">
							C++
						</li>
						<li className="col-md-6">
							Python
						</li>
					</ul>
				</div>
				<div className="card-body">
					<h5 className="card-title">Experience</h5>
					<ul className="d-flex flex-wrap">
						<li className="col-md-6">
							Java
						</li>
						<li className="col-md-6 ">
							C++
						</li>
						<li className="col-md-6">
							Python
						</li>
					</ul>
				</div>
				<div className="card-body">
					<h5 className="card-title">Education</h5>
					<ul className="d-flex flex-wrap">
						<li className="col-md-6">
							Java
						</li>
						<li className="col-md-6 ">
							C++
						</li>
						<li className="col-md-6">
							Python
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
export default ProfileUpdates;
