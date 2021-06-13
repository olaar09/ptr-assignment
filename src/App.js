import logo from './logo.svg';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Radio } from 'antd';

function App() {

  const malaria = [
    'fever',
    'rapidBreathing',
    'chills',
    'discomfort',
    'headache',
    'abdominal pain',
    'joint pain',
    'fatigue',
    'rapid breathing',
    'cough'
  ];

  const typhod = [
    'coughing',
    'appetite loss',
    'stomach pain',
    'weakness',
    'constipation',
    'vomitting',
    'high body temperature.',
    'mild rash on chest',
    'intestinal bleeding',
    'malaise',
    'myalgia',
    'delirium'
  ];

  const stages = [...typhod, ...malaria];

  const [stage, setStage] = useState(-1);
  const [stageValue, setStageValue] = useState(undefined);
  const [malariaCount, setMalariaCount] = useState(0);
  const [typhodCount, setTyphodCount] = useState(0);
  const [verdict, setVerdict] = useState(null);

  useEffect(() => {
    if (stage >= stages.length - 1) {
      console.log('Finished', malariaCount, typhodCount);
      if (malariaCount > typhodCount) {
        setVerdict('I think you have Malaria. Please consult your doctor for further diagnosis.');
      } else if (typhodCount > malariaCount) {
        setVerdict('I think you have Typhoid. Please consult your doctor for further diagnosis.');
      } else {
        setVerdict('Hmm, i couldnt deduce your condition. Please try again and answer more accurately');
      }
      doComplete();
    }
  }, [malariaCount, typhodCount, stage, stageValue]);

  const nextQuestion = () => {
    setVerdict(null);

    if (stage >= stages.length - 1) {
      if (stageValue) {
        countSymptom();
      }

    } else {
      if (stageValue) {
        countSymptom();
      }
      setStageValue(undefined);
      setStage(stage + 1);
    }
  }

  const doComplete = () => {
    setStageValue(undefined);
    setStage(-1);
    setMalariaCount(0);
    setTyphodCount(0);
  }
  const countSymptom = () => {
    if (malaria.indexOf(stages[stage]) !== -1) {
      setMalariaCount(malariaCount + 1);
    } else if (typhod.indexOf(stages[stage]) !== -1) {
      setTyphodCount(typhodCount + 1);
    }
  }

  const doSetStageValue = (value) => {
    console.log(value.target.value);
    setStageValue(value.target.value);
  }

  return (
    <div className="App">
      <header style={{ padding: 30 }} className="App-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/nile.jpeg" style={{ width: 100, height: 100 }} />
            <p>
              Anefu Peter Oche - 201123034
          </p>
          </div>
          <p>
            Malaria/Typhod Expert System
          </p>
        </div>

      </header>
      {stage === -1 && !verdict && <div style={{ padding: 30 }}>
        <h1>Instruction</h1>
        <p>This expert system helps you detect if you have Malaria or Typhod depending on your symptoms.</p>
        <p>Answer each question accurately to get a recommendation</p>
        <div>
          <Button onClick={nextQuestion} type="primary">Start</Button>
        </div>
      </div>}
      {stage >= 0 && !verdict &&
        < div style={{ padding: 30 }}>
          <h1>Question ({stage + 1} / {stages.length})</h1>
          <p style={{ fontSize: 18 }}>Are you expriencing <span style={{ fontWeight: 900 }}> {stages[stage]}  </span>?</p>
          <div style={{ marginTop: 10, marginBottom: 30 }}>
            <Radio.Group value={stageValue} onChange={doSetStageValue} size="large" style={{ marginTop: 16 }}>
              <Radio.Button value={true}>Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <Button disabled={stageValue === undefined} onClick={nextQuestion} type="primary">Continue</Button>
          </div>
        </div>}
      {verdict &&
        <div style={{ padding: 30 }}>
          <h1 style={{ color: 'black' }}>Expert verdict: </h1>
          <p style={{ fontSize: 18, color: 'gray', fontWeight: 600 }}>{verdict}</p>
          <div>
            <Button onClick={nextQuestion} type="primary">Take questionier again</Button>
          </div>
        </div>
      }
    </div >
  );
}

export default App;
