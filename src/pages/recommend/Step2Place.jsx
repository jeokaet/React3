import { Box, Typography, TextField, TableHead, TableBody, TableRow, TableCell, Grid, Table,  } from "@mui/material";


const Step2Place = ()=>{

    return(
        <Box>
            <Typography>출발지 장소명</Typography>
            <Typography>여행 날짜</Typography>
            <TextField
                fullWidth
                placeholder="검색어를 입력해주세요."
                name="searchPlace"
                multiline
                rows={4}
                variant="outlined"
            />
            <Grid sx={{ height:"100%", overflow:"auto"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                이거였나?
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        <TableRow>
                            <TableCell>
                                이거였나?
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                이거였나?
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                이거였나?
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                이거였나?
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                이거였나?
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                이거였나?
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                이거였나?
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                이거였나?
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
        </Box>
    );
}
export default Step2Place;