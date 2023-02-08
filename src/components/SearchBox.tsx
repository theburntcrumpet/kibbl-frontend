import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from 'react';

interface Props {
    setFilePaths: (filepaths:string[]) => void;
}

export default function SearchBox(props:Props) {
    const [searchQuery, setSearchQuery] = useState("");
    console.log(`${process.env.REACT_APP_KIBBL_API}/api/v1/notes`);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/notes/`, {params: { q: searchQuery }}).then(
            (response) => {
                props.setFilePaths(response.data);
            }
        ).catch(e => console.log(e));
    }, [searchQuery]);
    return (<TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={e=>setSearchQuery(e.target.value)} />);
}