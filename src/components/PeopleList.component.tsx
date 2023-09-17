import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Skeleton from "@mui/material/Skeleton";
import  Typography  from "@mui/material/Typography";

import { useQuery } from "@tanstack/react-query";
import { fetchStateWisePeople } from "../api/people";

const PeopleList = ({
  selectedState,
}: {
  selectedState: number | undefined;
}) => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [people, setPeople] = useState<
    {
      first_name: string;
      last_name: string;
    }[]
  >([]);

  const { data, refetch, isFetched, isFetching, isRefetching } = useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      if (selectedState)
        return fetchStateWisePeople(selectedState as number, page);
    },
    enabled: !!selectedState,
  });
  useEffect(() => {
    if (data) {
      setPeople(() => data.data);
      setTotal(() => data.count);
    }
  }, [data]);

  useEffect(() => {
    setPage(() => 1);
    if (page === 1) {
      refetch();
    }
  }, [selectedState]);

  useEffect(() => {
    setPeople(() => []);
    refetch();
  }, [page]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(() => newPage + 1);
  };

  return (
    <>
      {selectedState && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(isFetching || isRefetching) &&
                  Array.from({ length: 10 }, (_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton variant="rectangular" animation="wave" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rectangular" animation="wave" />
                      </TableCell>
                    </TableRow>
                  ))}
                {isFetched &&
                  people &&
                  people.map((person, index) => (
                    <TableRow key={index}>
                      <TableCell>{person.first_name}</TableCell>
                      <TableCell>{person.last_name}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={total}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={10}
          />
        </>
      )}
      {!selectedState && (
        <Typography
          variant="h5"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          No State Selected! Please Select One
        </Typography>
      )}
    </>
  );
};

export default PeopleList;
