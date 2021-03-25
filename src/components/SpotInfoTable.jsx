import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useSelector, useDispatch } from 'react-redux';
import { setScenicSpotList } from "../actions";


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    smallTable: {
        '& > *': {
            paddingLeft: '100px',
        },
    }
});

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const description = row.Description !== undefined ? row.Description : row.DescriptionDetail


    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" style={{ minWidth: '100px' }}>
                    {row.Name}
                </TableCell>
                <TableCell>{description}</TableCell>
            </TableRow>
            <TableRow className={classes.smallTable}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Open Time</TableCell>
                                        <TableCell>Address</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row" width='200px'>{row.OpenTime}</TableCell>
                                        <TableCell component="th" scope="row">{row.Address}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function SpotInfoTable(props) {
    const rows = useSelector(state => state.scenicSpotList)

    const dispatch = useDispatch()
    const [getTop, setGetTop] = useState(30)
    const [getSkip, setGetSkip] = useState(0)

    const requestOptions = {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
    };
    
    const cityName = useSelector(state => state.currCity)
    const cityPath = cityName === '' ? '' : `/${cityName}`
    
    const getSpots = () => {
        fetch(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot${cityPath}?$top=${getTop}&$skip=${getSkip}&$format=JSON`, requestOptions)
            .then(res => res.json())
            .then(data => {
                dispatch(setScenicSpotList(data))
            })
            .catch(error => console.error('Error:', error))
    }

    var isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight +1;
      }
    
      const trackScrolling = () => {
        const wrappedElement = document.getElementById('drawer-head');
        if (isBottom(wrappedElement)) {
          console.log('header bottom reached');
        //   getSpots()
          document.removeEventListener('scroll', trackScrolling);
        }
      };

    useEffect(() => {
        getSpots()
    }, [cityName])

    useEffect(() => {
        document.addEventListener('scroll', trackScrolling);
    }, [rows])

    return (
        <TableContainer component={Paper}>
            <div>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell key = 'table-detail'/>
                        <TableCell key = 'table-city-name'>Name</TableCell>
                        <TableCell key = 'table-description'>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
            </div>
        </TableContainer>
    );
}
