import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Typography, Button, InputLabel, Input, TableContainer, Paper, TableHead, TableRow, Table, TableBody, Checkbox, TableCell, FormControlLabel, } from '@mui/material';
import caxios from '../../api/caxios';

const Step1Date = ()=>{

    const ps = new kakao.maps.services.Places();

    return(
        <Box>
            <Typography>스탭1</Typography>
                <Grid item xs={12}>
                    <TextField fullWidth label="장소 검색" name="seachPlace" value={region.regionDetail} multiline rows={4} variant="outlined"  onChange={handleInputRegion}/>
                </Grid>
        </Box>
    );
}
export default Step1Date;