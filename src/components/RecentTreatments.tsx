import React, { useEffect, useState } from 'react';
import client from '../api';
import Treatment from '../models/TreatmentModel';
import { Box, Card, CardContent, Typography } from '@mui/joy';

type Props = {
  id?: string | null;
};

const RecentTreatments = ({ id }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [treatments, setTreatments] = useState<Treatment[] | []>([]);

  useEffect(() => {
    const fetchTreats = async () => {
      try {
        const treatments = await client.getTreatments();
        setTreatments(treatments);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTreats();
  }, []);

  useEffect(() => {
    const fetchTreat = async (id: string) => {
      try {
        setIsLoading(true);
        const treatment = await client.getTreatment(id);
        if (treatment !== null) {
          setTreatments((trts) => [treatment, ...trts]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof id === 'string') {
      fetchTreat(id);
    }
  }, [id]);

  let content;
  if (treatments.length === 0) {
    content = <span>There is no recent treatments</span>;
  } else {
    content = (treatments as Treatment[]).map((treat: Treatment) => {
      return (
        <Card key={treat.identifier} variant='soft' sx={{ mt: 1 }}>
          <CardContent>
            <Typography level='title-md'>{treat.eventType}</Typography>
            <Typography level='body-md'>{treat.notes ? treat.notes : 'No notes'}</Typography>
          </CardContent>
        </Card>
      );
    });
  }

  return <Box sx={{ mx: 4 }}>{isLoading ? 'Loading...' : content}</Box>;
};

export default RecentTreatments;
