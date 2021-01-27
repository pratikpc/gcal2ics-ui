import React, { useEffect, useState } from 'react';
import './App.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core';

import gcal2ics from 'gcal2ics';

const useStyles = makeStyles(theme => ({
   root: {
      flexGrow: 1
   },
   paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
   }
}));
function App() {
   const classes = useStyles();

   const [embed, setEmbed] = useState(
      'https://calendar.google.com/calendar/embed?src=info@example.com'
   );
   const [ical, setICals] = useState('');
   const [tooltipShown, setTooltipOpen] = useState(false);

   useEffect(() => {
      try {
         setICals(gcal2ics(embed));
      } catch (err) {
         setICals('');
      }
   }, [embed]);

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar>
               <Typography variant="h3" color="inherit">
                  Google Embedded Calendar to iCALs
               </Typography>
            </Toolbar>
         </AppBar>
         <div
            style={{
               position: 'absolute',
               left: '50%',
               top: '50%',
               transform: 'translate(-50%, -50%)'
            }}
         >
            <Grid container direction="row">
               <Grid item xs={9}>
                  <TextField
                     required
                     value={embed}
                     type="url"
                     fullWidth={true}
                     label="Embed URL"
                     helperText="Embed URL"
                     variant="filled"
                     onChange={({ target: { value } }) => setEmbed(value)}
                  />
               </Grid>
               <Grid item xs={3}>
                  <Button
                     fullWidth={true}
                     id="convert"
                     onClick={() => {
                        try {
                           setICals(gcal2ics(embed));
                        } catch (err) {
                           setICals('');
                        }
                     }}
                  >
                     Convert
                  </Button>
               </Grid>
               <Grid item xs={9}>
                  <TextField
                     value={ical}
                     id="ical"
                     label="iCals URL"
                     helperText="iCals URL"
                     variant="filled"
                     fullWidth={true}
                  />
               </Grid>
               <Grid item xs={3}>
                  <Tooltip
                     open={tooltipShown}
                     onClose={() => setTooltipOpen(false)}
                     // onOpen={() => setTooltipOpen(true)}
                     title="Copied"
                  >
                     <Button
                        id="copy"
                        fullWidth={true}
                        onClick={async () => {
                           // Copy to Clipboard
                           await navigator.clipboard.writeText(ical);
                           setTooltipOpen(true);
                        }}
                     >
                        Copy
                     </Button>
                  </Tooltip>
               </Grid>
            </Grid>
         </div>
      </div>
   );
}

export default App;
