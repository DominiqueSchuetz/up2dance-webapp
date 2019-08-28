import React, { Fragment } from "react";
import { Button, SideNav, SideNavItem } from "react-materialize";

const Header: React.FC = () => {
	const css = `
    #root > div > div {
        z-index: 99999 !important;
    }
`;

	return (
		<Fragment>
			<header>
				<nav className="navbar dark">
					<div className="nav-wrapper">
						<style>{css}</style>
						<div>
							<SideNav
								trigger={<i className="icon-diamond" />}
								options={{ closeOnClick: true, inDuration: 5000 }}
							>
								<SideNavItem
									userView
									// tslint:disable-next-line: jsx-no-multiline-js
									user={{
										background: "https://placeimg.com/640/480/tech",
										image: "https://img.icons8.com/bubbles/50/000000/check-male.png",
										name: "John Doe"
									}}
								/>
								<SideNavItem href="#!icon" icon="cloud">
									First Link With Icon
								</SideNavItem>
								<SideNavItem href="#!second">Second Link</SideNavItem>
								<SideNavItem divider />
								<SideNavItem subheader>Subheader</SideNavItem>
								<SideNavItem waves href="#!third">
									Third Link With Waves
								</SideNavItem>
							</SideNav>
						</div>
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li className="active">
								<a className="dropdown-trigger" href="#!" data-target="pages">
									Pages
									<i className="material-icons right">arrow_drop_down</i>
								</a>
							</li>
							<li>
								<a href="blog.html">Blog</a>
							</li>
							<li>
								<a href="team.html">Team</a>
							</li>
							<li>
								<a href="docs/about.html">Docs</a>
							</li>
							<li>
								<a href="#">Buy Now!</a>
							</li>
						</ul>

						<ul id="pages" className="dropdown-content">
							<li>
								<a href="horizontal-half.html">Horizontal Halves</a>
							</li>
							<li>
								<a href="sierra.html">Zoom Out</a>
							</li>
							<li>
								<a className="active" href="circle-reveal.html">
									Circle Reveal
								</a>
							</li>
							<li>
								<a href="phone-wall.html">Phone Wall</a>
							</li>
							<li>
								<a href="element-transitions.html">Element Transitions</a>
							</li>
							<li>
								<a href="basic-elements.html">Basic Elements</a>
							</li>
							<li>
								<a href="card-shuffle.html">Shuffle</a>
							</li>
							<li>
								<a href="postcards.html">Postcards</a>
							</li>
						</ul>

						<a href="#" data-target="slide-out" className="sidenav-trigger button-collapse right">
							<i className="material-icons black-text">menu</i>
						</a>
					</div>
				</nav>

				<ul id="slide-out" className="sidenav">
					<li className="no-padding">
						<ul className="collapsible collapsible-accordion">
							<li className="bold">
								<a className="collapsible-header waves-effect waves-teal active">Pages</a>
								<div className="collapsible-body">
									<ul>
										<li>
											<a href="horizontal-half.html">Horizontal Halves</a>
										</li>
										<li>
											<a href="sierra.html">Zoom Out</a>
										</li>
										<li>
											<a className="active" href="circle-reveal.html">
												Circle Reveal
											</a>
										</li>
										<li>
											<a href="phone-wall.html">Phone Wall</a>
										</li>
										<li>
											<a href="element-transitions.html">Element Transitions</a>
										</li>
										<li>
											<a href="basic-elements.html">Basic Elements</a>
										</li>
										<li>
											<a href="card-shuffle.html">Shuffle</a>
										</li>
										<li>
											<a href="postcards.html">Postcards</a>
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</li>
					<li>
						<a className="waves-effect waves-teal" href="blog.html">
							Blog
						</a>
					</li>
					<li>
						<a className="waves-effect waves-teal" href="team.html">
							Team
						</a>
					</li>
					<li>
						<a className="waves-effect waves-teal" href="docs/about.html">
							Docs
						</a>
					</li>
					<li>
						<a className="waves-effect waves-teal" href="#">
							Buy Now!
						</a>
					</li>
				</ul>
			</header>
		</Fragment>
	);
};

export default Header;
