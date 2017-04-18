/* eslint-env jest */
// import mapReducer from '../../src/reducers/mapReducers'
import reducers from '../../src/reducers'

test('Get Initial State', () => {
  let state
  state = reducers(undefined, {})
  expect(state).toEqual({mapReducer: {geoFiles: [], years: [], currentLayer: {layer: 0, year: '2015', branch: 'federal'}, data: {}, addr: null}})
})

test('META_DATA', () => {
  let state
  state = reducers({mapReducer: {geoFiles: [], years: [], currentLayer: {layer: 0, year: '2015', branch: 'federal'}, data: {}, addr: null}}, {type: 'META_DATA', geoFiles: [{federal: {'2015': 'cb_2015_us_cd114_500k'}}, {lower: {'2010': 'gz_2010_42_620_l2_500k', '2013': 'cb_2013_42_sldl_500k', '2014': 'cb_2014_42_sldl_500k', '2015': 'cb_2015_42_sldl_500k', '2016': 'cb_2016_42_sldl_500k'}}, {upper: {'2010': 'gz_2010_42_610_u2_500k', '2013': 'cb_2013_42_sldu_500k', '2014': 'cb_2014_42_sldu_500k', '2015': 'cb_2015_42_sldu_500k', '2016': 'cb_2016_42_sldu_500k'}}], branch: ['federal'], years: ['2015']})
  expect(state).toEqual({mapReducer: {geoFiles: [{federal: {'2015': 'cb_2015_us_cd114_500k'}}, {lower: {'2010': 'gz_2010_42_620_l2_500k', '2013': 'cb_2013_42_sldl_500k', '2014': 'cb_2014_42_sldl_500k', '2015': 'cb_2015_42_sldl_500k', '2016': 'cb_2016_42_sldl_500k'}}, {upper: {'2010': 'gz_2010_42_610_u2_500k', '2013': 'cb_2013_42_sldu_500k', '2014': 'cb_2014_42_sldu_500k', '2015': 'cb_2015_42_sldu_500k', '2016': 'cb_2016_42_sldu_500k'}}], years: ['2015'], currentLayer: {layer: 0, year: '2015', branch: 'federal'}, data: {}, addr: null}})
})
