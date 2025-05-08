import {  Box, Grid, TextField, Typography, Button, InputLabel, Input, TableContainer, Paper, TableHead, TableRow, Table, TableBody, Checkbox, TableCell, FormControlLabel, Modal, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function RegionUpdate ({ open, onClose }) {

    const [ region, setRegion ] = useState({});
    
    const handleInputRegion = (e) => {
        const { name, value, files } = e.target;
        setRegion({ ...region, [name]: files ? files[0] : value });
    }

    const handleUpdateRegion = () => {

    }

    return(
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4, }}>
            <IconButton onClick={onClose}><CloseIcon /></IconButton>
                <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                            <TextField fullWidth label="지역명" name="regionName" value={region.regionName|| "null"} variant="outlined" onChange={handleInputRegion}/>
                            </Grid>
                
                            <Grid item xs={12}>
                            <TextField fullWidth label="지역 설명" name="regionDetail" value={region.regionDetail|| "null"} multiline rows={4} variant="outlined"  onChange={handleInputRegion}/>
                            </Grid>
                
                            <Grid item xs={12}>
                            <InputLabel htmlFor="region-image">지역 대표 이미지</InputLabel>
                            <Input id="region-image" type="file" name="filePath" inputProps={{ accept: 'image/*' }} fullWidth  onChange={handleInputRegion}/>
                            </Grid>
                
                            <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleUpdateRegion}> 지역 정보 수정 </Button>
                            </Grid>
                        </Grid>
            </Box>
        </Modal>
    )
}

export default RegionUpdate;