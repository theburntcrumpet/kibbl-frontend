import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from 'react';

interface Props {
    setFilePaths: (filepaths: string[]) => void,
    searchTerm: string,
    setSearchTerm: (searchTerm: string) => void
}

export default function SearchBox(props: Props) {
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(props.searchTerm);

    useEffect(() => {
        let timerId = setTimeout(() => {
            setDebouncedSearchTerm(props.searchTerm);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [props.searchTerm]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/notes/`, { params: { q: debouncedSearchTerm } }).then(
            (response) => {
                props.setFilePaths(response.data);
            }
        ).catch(e => console.log(e));
    }, [debouncedSearchTerm]);

    return (
        <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            fullWidth
            margin="dense"
            value={props.searchTerm}
            onChange={e => { props.setSearchTerm(e.target.value) }}
        />
    );
}
