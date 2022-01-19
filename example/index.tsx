import 'react-app-polyfill/ie11';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid } from '../.';
import { csv, json } from 'd3';
// @ts-ignore
import debounce from 'lodash/debounce';
import exampleData from './data';

const App = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [modifiedData, setModifiedData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [dataUrl, setDataUrl] = React.useState('');
  const [overrideDataUrl, setOverrideDataUrl] = React.useState('');
  const [localOverrideDataUrl, setLocalOverrideDataUrl] = React.useState('');

  const debounceSetOverrideDataUrl = debounce(setOverrideDataUrl, 500);
  React.useEffect(() => {
    debounceSetOverrideDataUrl(localOverrideDataUrl);
  }, [localOverrideDataUrl]);

  const fetchData = async () => {
    setIsLoading(true);

    if (overrideDataUrl || dataUrl) {
      const url = overrideDataUrl || dataUrl;
      const fetchFunction = url.includes('.csv') ? csv : json;
      const res = await fetchFunction(url).catch(err => {
        console.log(`Issue loading data from ${url}`, err);
        setData([]);
      });

      // @ts-ignore
      setData(Array.isArray(res) ? res : []);
      setModifiedData(Array.isArray(res) ? res : []);
      setIsLoading(false);
    } else {
      setData(exampleData);
      setModifiedData(exampleData);
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, [dataUrl, overrideDataUrl]);

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: 16,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <select
          style={{
            padding: 16,
            marginBottom: 8,
            background: '#f4f4f4',
          }}
          value={dataUrl}
          onChange={e => setDataUrl(e.target.value)}
        >
          <option value="">Fallback or custom url</option>
          {dataUrls.map(url => (
            <option value={url} key={url}>
              {url}
            </option>
          ))}
        </select>

        {!dataUrl && (
          <input
            style={{
              display: 'block',
              padding: 16,
              marginBottom: 8,
              background: '#f4f4f4',
            }}
            value={localOverrideDataUrl}
            onChange={e => setLocalOverrideDataUrl(e.target.value)}
          />
        )}
      </div>

      <div style={{ flex: '1 1 0%' }}>{!isLoading && (
        <Grid
          diffData={data}
          data={modifiedData}
          isEditable
          onEdit={(newData: any[]) => {
            setModifiedData(newData);
          }}
        />
      )}</div>
    </div>
  );
};

const dataUrls = [
  'https://raw.githubusercontent.com/the-pudding/data/master/birth-control/everused.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/birth-control/sideEffects.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/boybands/bands.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/boybands/boys.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/campaign-colors/colors.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/cookies/choc_chip_cookie_ingredients.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/dog-shelters/allDogDescriptions.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/dearabby/raw_da_qs.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/hype/paths.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/births/allBirthData.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/names-in-songs/allNames.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/winning-the-internet/dump-2020-12-15.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/people-map/people-map.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/rain/annual_precipitation.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/pockets/measurements.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/filmordigital/top_movies_data.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/laugh/reddit-laughs.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/summer-reading/hipster.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/vogue/faces.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/one-hit-wonders/data.csv',
  'https://raw.githubusercontent.com/the-pudding/data/master/stand-up/ali-wong--topics.csv',
];

ReactDOM.render(<App />, document.getElementById('root'));
