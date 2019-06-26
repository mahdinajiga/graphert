import React from 'react';
import { useState, useEffect, useRef} from 'react';

import ReactJson from "react-json-view";

import { createQuery } from 'meteor/cultofcoders:grapher'

import Idea from '../api/idea';
import Mentor from '../api/mentor';
import Team from '../api/team';

import { MentorToIdeaQuery, AllMentors } from '../api/mentor/queries';
import { AllIdeas, IdeaToBothQuery } from '../api/idea/queries';
import { AllTeams, TeamsToIdeaQuery, TeamsComp } from '../api/team/queries';


import '../api/idea/links';
import '../api/mentor/links';
import '../api/team/links';

const App = () => {
	const [MentorName, MentorNameSet] = useState("");
	const [IdeaName, IdeaNameSet] = useState("");
	const [IdeasMentorName, IdeasMentorNameSet] = useState("");
	const [TeamName, TeamNameSet] = useState("");
	const [TeamIdeaName, TeamIdeaNameSet] = useState("");

	const [showMentorData, showMentorDataSet] = useState({});
	const [showIdeaData, showIdeaDataSet] = useState({});
	const [showTeamData, showTeamDataSet] = useState({});
	const [showTeamComp, showTeamCompSet] = useState({});

	const [AllMentorDataResults, AllMentorDataResultsSet] = useState([]);
	const [AllIdeaDataResults, AllIdeaDataResultsSet] = useState([]);
	const [AllTeamDataResults, AllTeamDataResultsSet] = useState([]);

	const [Access, AccessSet] = useState(false);

	
	useEffect(()=>{
		AllMentors.clone({}).fetch((err, results) => {
			AllMentorDataResultsSet(results);
		});

		AllIdeas.clone({}).fetch((err, results) => {
			AllIdeaDataResultsSet(results);
		});
		
		AllTeams.clone({}).fetch((err, results) => {
			AllTeamDataResultsSet(results);
		});
	}, [MentorName, IdeaName, TeamName])

	function GetMentorsButton() {
		return AllMentorDataResults.map(mentor => {
			return (
				<React.Fragment key={mentor.mentorName}>
					<button onClick={() => {
						MentorToIdeaQuery.clone({
							mentorName: mentor.mentorName
						}).fetch((err, results) => {
							if(err) throw err;
							if(results.length != 0)
							{
								showMentorDataSet({...results[0]});
							}
						});
					}}>{mentor.mentorName}</button>
				</React.Fragment>
			);
		})
	}

	function GetIdeasButton() {
		return AllIdeaDataResults.map(idea => {
			return (
				<React.Fragment key={idea.ideaName}>
					<button onClick={() => {
						IdeaToBothQuery.clone({
							ideaName: idea.ideaName,
							access: Access
						}).fetch((err, results) => {
							if(err) throw err;
							if(results.length != 0)
							{
								showIdeaDataSet({...results[0]});
							}
						});
					}}>{idea.ideaName}</button>
				</React.Fragment>
			);
		})
	}

	function GetTeamsButton() {
		return AllTeamDataResults.map(team => {
			return (
				<React.Fragment key={team.teamName}>
					<button onClick={() => {
						TeamsToIdeaQuery.clone({
							teamName: team.teamName,
							access: Access
						}).fetch((err, results) => {
							if(err) throw err;
							if(results.length != 0)
							{
								showTeamDataSet({...results[0]});
							}
						});
						
						TeamsComp.clone({
							teamName: team.teamName
						}).fetch((err, results) => {
							if(err) throw err;
							if(results.length != 0)
							{
								showTeamCompSet({...results[0]})
							}
						});

					}}>{team.teamName}</button>
				</React.Fragment>
			);
		})
	}
					

	return (
		<div>
			<div>
				<button style={{margin:'15px'}} onClick={()=>{
					showIdeaDataSet({result:Idea.createQuery({
						$filter({filters, options, params}) {
							filters.ideaName = params.IdeaName;
						},
						mentor:{
							mentorName:1
						}
					}, {
						IdeaName: IdeaName
					}).fetch()});
				}}>Create query client-side</button>

				<button style={{margin:'15px'}} onClick={()=>{
					AccessSet(!Access);
				}}>Access: {!Access ? "False" : "True"}</button>
			</div>
			<div>
				<h3>Add Mentor</h3>
				<input type="text" placeholder="Mentor Name" value={MentorName} onChange={
					(e) => {
						MentorNameSet(e.currentTarget.value);
					}
				} />
				<button onClick={() => {
					var Mentors = Mentor.find({ mentorName: MentorName }).fetch();
					if (Mentors.length != 0) {
						console.log("mentor exists")
					}
					else {
						Mentor.insert({ mentorName: MentorName })
						MentorNameSet("")
					}
				}}>Add Mentor</button>
			</div>

			<div>
				<h3>Add Idea</h3>
				<input type="text" placeholder="Idea Name" value={IdeaName} onChange={
					(e) => {
						IdeaNameSet(e.currentTarget.value);
					}
				} />
				<input type="text" placeholder="Mentor Name" value={IdeasMentorName} onChange={
					(e) => {
						IdeasMentorNameSet(e.currentTarget.value);
					}
				} />
				<button onClick={() => {
					var Ideas = Idea.find({ ideaName: IdeaName }).fetch();
					var Mentors = Mentor.find({ mentorName: IdeasMentorName }).fetch();
					if (Ideas.length != 0) {
						console.log("idea exists")
					}
					else {
						if (Mentors.length == 0)
						{
							console.log("mentor doesn't exists")
						}
						else
						{
							Idea.insert({ ideaName: IdeaName, mentorId: Mentors[0]._id, teamIds:[] })
							IdeaNameSet("");
						}
					}
				}}>Add Idea</button>
			</div>

			<div>
				<h3>Add Team</h3>
				<input type="text" placeholder="Team Name" value={TeamName} onChange={
					(e) => {
						TeamNameSet(e.currentTarget.value);
					}
				} />
				<button onClick={() => {
					var Teams = Team.find({ teamName: TeamName }).fetch();
					if (Teams.length != 0) {
						console.log("team exists")
					}
					else {
						Team.insert({ teamName: TeamName });
						TeamNameSet("");
					}
				}}>Add Team</button>
			</div>

			<div>
				<h3>Add Idea to Team</h3>
				<input type="text" placeholder="Team Name" value={TeamName} onChange={
					(e) => {
						TeamNameSet(e.currentTarget.value);
					}
				} />
				<input type="text" placeholder="Idea Name" value={TeamIdeaName} onChange={
					(e) => {
						TeamIdeaNameSet(e.currentTarget.value);
					}
				} />
				<input type="text" placeholder="Mentor Name" value={MentorName} onChange={
					(e) => {
						MentorNameSet(e.currentTarget.value);
					}
				} />
				<button onClick={() => {
					var Ideas = Idea.find({ ideaName: TeamIdeaName }).fetch();
					var Teams = Team.find({ teamName: TeamName }).fetch();
					if (Ideas.length == 0) {
						console.log("idea dosen't exists")
					}
					else {
						if (Teams.length == 0)
						{
							console.log("Team doesn't exists")
						}
						else
						{
							if(!Ideas[0].teamIds.includes(Teams[0]._id))
							{
								Idea.update({_id: Ideas[0]._id}, {$push: {teamLinks: {
									_id: Teams[0]._id,
									adder: MentorName
								}}})	
								TeamNameSet("");
								TeamIdeaNameSet("");
							}
						}
					}
				}}>Add Idea to Team</button>
			</div>
			<hr></hr>
			<div>
				<div style={{margin: 'auto'}}>
					<GetMentorsButton/>
				</div>
				<div style={{margin: 'auto'}}>
					<GetIdeasButton/>
				</div>
				<div style={{margin: 'auto'}}>
					<GetTeamsButton/>
				</div>
			</div>

			<hr></hr>

			<div>
				<h3>Mentor Data</h3>
				<ReactJson style={{minHeight: '75vh'}} src={showMentorData} theme="monokai" collapsed={true}/>
			</div>
			<hr style={{width:'50%'}}></hr>
			<div>
				<h3>Idea Data</h3>
				<ReactJson style={{minHeight: '75vh'}} src={showIdeaData} theme="monokai" collapsed={true}/>
			</div>
			<hr style={{width:'50%'}}></hr>
			<div>
				<h3>Team Data</h3>
				<ReactJson style={{minHeight: '75vh'}} src={showTeamData} theme="monokai" collapsed={true}/>
			</div>
			<hr style={{width:'50%'}}></hr>
			<div>
				<h3>Team Comps</h3>
				<ReactJson style={{minHeight: '75vh'}} src={showTeamComp} theme="monokai" collapsed={true}/>
			</div>

		</div>
	)
};

export default App;
