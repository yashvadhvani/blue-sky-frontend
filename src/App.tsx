import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import MapComponent from "./components/Map.component";
import Header from "./components/Header.component";
import SelectState from "./components/StateSelect.component";
import PeopleList from "./components/PeopleList.component";
import { fetchAllStates } from "./api/state";
import { Skeleton } from "@mui/material";

function App() {
  // const [states, setStates] = useState<{ id: number; name: string }[]>([]);
  const [selectedState, setSelectedState] = useState<number | undefined>(
    undefined
  );

  const { isFetching, data } = useQuery({
    queryFn: fetchAllStates,
    queryKey: ["states"],
  });

  return (
    <Stack sx={{ width: "100%", height: "100%" }}>
      <Header />
      <Box sx={{ width: "100%", height: "70vh", pb: 4 }}>
        <Box
          mt={10}
          sx={{
            width: "100%",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "20%",
            }}
          >
            {isFetching && (
              <Skeleton variant="rectangular" height={100} animation="wave" />
            )}
            {data && (
              <SelectState
                options={data}
                value={selectedState}
                onChange={(e) => setSelectedState(Number(e.target.value))}
              />
            )}
          </Box>
        </Box>

        <Grid container height={"100%"} spacing={2} padding={2}>
          <Grid item xs={6}>
            <MapComponent selectedState={selectedState} />
          </Grid>
          <Grid item xs={6}>
            <PeopleList selectedState={selectedState} />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}

export default App;
