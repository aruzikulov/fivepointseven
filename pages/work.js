import autobind from 'autobind-decorator';
import Page from '../components/Page';
import Links from '../components/Links';
import ProjectBrief from '../components/work-page/ProjectBrief';
import ProjectList from '../components/work-page/ProjectList';
import Logo from '../components/Logo';
import portfolioItems from '../lib/portfolio-items';
import { sleep, addClass, removeClass } from '../lib/utils';

@autobind
export default class WorkPage extends React.Component {
	state = {
		selectedProject: portfolioItems[0],
	};

	async selectItem(selectedProject) {
		addClass('work-box-project-info', 'framework-selection-progress');
		addClass('work-box-project-image', 'cross-disolve');
		await sleep(0.3);
		this.setState({ selectedProject }); // No need to trippledot the only item

		await sleep(0.4);
		removeClass('work-box-project-info', 'framework-selection-progress');
		removeClass('work-box-project-image', 'cross-disolve');
	}

	render() {
		const project = this.state.selectedProject;
		return (
			<Page title="Portfolio">
				<div className="work-container">
					<Logo />
					<div className="work-box" id="work-box">
						<ProjectBrief project={project} />
						<ProjectList
							portfolioItems={portfolioItems}
							selectedProject={project}
							selectItem={this.selectItem}
						/>
					</div>
					<Links active="work" />
				</div>
			</Page>
		);
	}
}
