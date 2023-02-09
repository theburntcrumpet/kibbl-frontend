import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from 'react';

interface Props {
    setFilePaths: (filepaths:string[]) => void,
    searchTerm: string,
    setSearchTerm: (searchTerm:string) => void
}

export default function SearchBox(props:Props) {

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/notes/`, {params: { q: props.searchTerm }}).then(
            (response) => {
                props.setFilePaths(response.data);
            }
        ).catch(e => console.log(e));
    }, [props.searchTerm]);
    return (<TextField id="outlined-basic" label="Search" variant="outlined" fullWidth value={props.searchTerm} onChange={e=>{props.setSearchTerm(e.target.value)}}/>);
}