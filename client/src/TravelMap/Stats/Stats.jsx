import React from 'react';
import BpkText from 'bpk-component-text';
import PieChart from 'react-minimal-pie-chart';


import STYLES from './Stats.scss';

import { COUNTRIES, CODES, LEGEND, STATUSES } from '../map_data';

const c = className => className || 'UNKNOWN';


class Stats extends React.Component {
    render() {
        const { stats } = this.props;
        return <PieChart
            className={c('Stats__pie')}
            label
            labelStyle={{
                fontSize: '5px',
                fontFamily: 'sans-serif',
            }}
            paddingAngle={5}
            radius={42}
            labelPosition={60}
            lineWidth={15}
            animate
            data={[
                { title: 'TODO', value: stats.TODO || 0, color: LEGEND.TODO.fill },
                { title: 'Visited', value: stats.Visited || 0, color: LEGEND.Visited.fill },
                { title: 'Lived', value: stats.Lived || 0, color: LEGEND.Lived.fill },
                { title: 'Planned', value: stats.Planned || 0, color: '#A4243B' },
            ]}
        />
    }
}

export default Stats;
