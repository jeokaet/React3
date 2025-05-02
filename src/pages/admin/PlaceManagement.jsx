import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Typography, Button, InputLabel, Input } from '@mui/material';
import caxios from '../../api/caxios';

function PlaceManagement() {
    const [ region, setRegion ] = useState({});
    const [ regionList, setRegionList ] = useState([]);


    useEffect (() => {
        caxios.get("/region")
        .catch((error) => {
            console.error("에러 발생:", error);
            alert("지역 목록을 불러오는데 실패했습니다.");
        })
        .then((resp) =>{
            setRegionList(resp.data);
        })
    }, [])

    const handleInputRegion = (e) => {
        const { name, value, files } = e.target;
        setRegion({ ...region, [name]: files ? files[0] : value });
    }

    const handleInsertRegion = () => {
        console.log(region);
        caxios.post("/region", region)
        .catch((error) => {
            setRegion({
                regionName: '',
                regionDetail: '',
                filePath: null
            });
            console.error("에러 발생:", error);
            alert("등록 실패");
          })
          .then((resp) => {
            setRegion({
                regionName: '',
                regionDetail: '',
                filePath: null
            });
            alert("지역이 등록되었습니다.");
        });
    }

    return (
        <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
            지역 추가
        </Typography>

        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
            <TextField fullWidth label="지역명" name="regionName" value={region.regionName} variant="outlined" onChange={handleInputRegion}/>
            </Grid>

            <Grid item xs={12}>
            <TextField fullWidth label="지역 설명" name="regionDetail" value={region.regionDetail} multiline rows={4} variant="outlined"  onChange={handleInputRegion}/>
            </Grid>

            <Grid item xs={12}>
            <InputLabel htmlFor="region-image">지역 대표 이미지</InputLabel>
            <Input id="region-image" type="file" name="filePath" inputProps={{ accept: 'image/*' }} fullWidth  onChange={handleInputRegion}/>
            </Grid>

            <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleInsertRegion}> 지역 등록 </Button>
            </Grid>
        </Grid>
        </Box>
    );
}

export default PlaceManagement;
