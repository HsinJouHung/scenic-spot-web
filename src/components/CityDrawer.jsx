import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SpotInfoTable from './SpotInfoTable'
import { useSelector, useDispatch } from 'react-redux';
import { setCurrCity } from '../actions';
import { useHistory } from "react-router-dom"
import { ContactSupportOutlined } from '@material-ui/icons';

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function CityDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true)
  const cities = useSelector(state => state.cities)

  const dispatch = useDispatch()
  const history = useHistory()
  const city = useSelector(state => state.currCity)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCityClicked = (key) => {
    // dispatch(setCurrCity(key))
    history.push(`/scenicSpot/${key}`)
  }

  var isBottom = (el) => {
    console.log('client', el.getBoundingClientRect().bottom, window.innerHeight)
    return el.getBoundingClientRect().bottom <= window.innerHeight +1;
  }
  
  const trackScrolling = () => {
    console.log('sc')
    const wrappedElement = document.getElementById('drawer-head');
    if (isBottom(wrappedElement)) {
      console.log('header bottom reached');
      document.removeEventListener('scroll', trackScrolling);
    }
  };

  React.useEffect(() => {
    // console.log('city', chCity.value)
    document.addEventListener('scroll', trackScrolling);
  }, [])

  return (
    <div className={classes.root} id = 'drawer-head'>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>Scenic Spots</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {Object.entries(cities).map(([key, value]) => (
            <ListItem button key={key} onClick={() => handleCityClicked(key)}>
              <ListItemText primary={value} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* <div onScroll = {(e) => handleOnScroll(e)}></div> */}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        
          <div className={classes.drawerHeader} />
          <h2 style={{ 'textAlign': 'left' }}>{city}</h2>
          <SpotInfoTable city={props.city} />
      </main>
    </div>
  );
}
