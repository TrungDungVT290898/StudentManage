import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import StatisticItem from './components/StatisticItem';
import FaceIcon from '@mui/icons-material/Face';
import WomanIcon from '@mui/icons-material/Woman';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Widget from './components/Widget';
import Stack from '@mui/material/Stack/Stack';
import Typography from '@mui/material/Typography';
import StudentRankingList from './components/StudentRankingList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCity,
} from './dashboardSlice';
import { Skeleton } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
function Dashboard() {
  const loading = useAppSelector(selectDashboardLoading);
  const dispatch = useAppDispatch();
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCity);
  const gridStyle = {
    width: 'auto',
    height: 30,
    border: '1px solid black',
    borderRadius: 3,
    marginLeft: 2,
  };
  const gridContainer = {
    display: 'flex',
    flexBasis: '10%',
    justifyContent: 'center',
  };
  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <div>
          <Stack>
            <Grid sx={gridContainer} container>
              <Grid sx={gridStyle}>
                <StatisticItem key="malecount" icon={<FaceIcon />} label={'Male'} value={statistics.maleCount} />
              </Grid>
              <Grid sx={gridStyle}>
                <StatisticItem key="femalecount" icon={<WomanIcon />} label={'Female'} value={statistics.femaleCount} />
              </Grid>
              <Grid sx={gridStyle}>
                <StatisticItem
                  key="highcount"
                  icon={<StarBorderIcon />}
                  label={'High Mark'}
                  value={statistics.highMarkCount}
                />
              </Grid>
              <Grid sx={gridStyle}>
                <StatisticItem
                  key="lowcount"
                  icon={<ThumbDownOffAltIcon />}
                  label={'Low Mark'}
                  value={statistics.lowMarkCount}
                />
              </Grid>
            </Grid>
          </Stack>
          <Stack mt={4}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={12} sm={12} md={12}>
                ALL STUDENTS
              </Grid>
              <Grid key="highlist" item xs={2} sm={4} md={4}>
                <Widget bgColor="green" title="Student with highest mark">
                  <StudentRankingList students={highestStudentList} />
                </Widget>
              </Grid>
              <Grid key="lowlist" item xs={2} sm={4} md={4}>
                <Widget bgColor="tomato" title="Student with lowest mark">
                  <StudentRankingList students={lowestStudentList} />
                </Widget>
              </Grid>
            </Grid>
          </Stack>
          <Stack mt={4}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={12} sm={12} md={12}>
                RANKING BY CITY
              </Grid>
              {rankingByCityList.map(city => (
                <Grid key={`city_${city.cityId}_code_grid`} item xs={2} sm={3} md={3}>
                  <Widget bgColor="#3B3A3F" title={city.cityName}>
                    <StudentRankingList students={city.rankingList} />
                  </Widget>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </div>
      )}
    </>
  );
}

export default Dashboard;
