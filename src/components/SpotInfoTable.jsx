import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
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
                                        {/* <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell> */}
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

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };


export default function SpotInfoTable(props) {
    const rows = useSelector(state => state.scenicSpotList)

    const dispatch = useDispatch()

    const requestOptions = {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
    };

    // const cityName = useSelector(state => state.currCity)
    const cityName = useSelector(state => state.currCity)
    const cityPath = cityName === '' ? '' : `/${cityName}`

    const getSpots = () => {
        fetch(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot${cityPath}?$top=30&$format=JSON`, requestOptions)
            // fetch('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON', requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log('data', data)
                dispatch(setScenicSpotList(data))
                localStorage.setItem('data', data)
            })
            .catch(error => console.error('Error:', error))
    }


    React.useEffect(() => {
        getSpots()
        console.log('city', cityName)
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
