import { Card, styled, Typography } from '@mui/joy';
import {
  iconColorMap,
  iconMap,
  sgvToMbg,
  titleMap,
  typographyColorMap,
  eventType,
} from '../helpers';
import TreatmentModel from '../models/TreatmentModel';
import dayjs from 'dayjs';

type Props = {
  treat: TreatmentModel;
};

function TreatmentCard({ treat }: Props) {
  const Icon = iconMap[treat.eventType];
  const titleText = titleMap[treat.eventType];
  const iconColor = iconColorMap[treat.eventType];
  const typographyColor = typographyColorMap[treat.eventType];

  return (
    <GridCard variant='plain'>
      <CardTitle>
        <Icon fill={iconColor} width='1.1em' height='1.1em' viewBox='0 0 25 25' />
        <Typography ml='2px' color={typographyColor} level='title-lg' fontWeight='700'>
          {titleText}
        </Typography>
      </CardTitle>
      <TimeT>{dayjs(treat.date).format('HH:mm')}</TimeT>
      {treat.notes ? (
        <Typography gridArea='note'>{treat.notes}</Typography>
      ) : (
        <Placeholder>No notes</Placeholder>
      )}
      {treat.eventType === eventType.MEAL && (
        <>
          <Container style={{ gridArea: 'content1' }}>
            <Label>Insulin</Label>
            <Value>{treat.insulin}</Value>
          </Container>
          <Container style={{ gridArea: 'content2' }}>
            <Label>Carbs</Label>
            <Value>
              {treat.carbs} <Units>g</Units>
            </Value>
          </Container>
          <Container style={{ gridArea: 'content3' }}>
            <Label>Pre-Bolus</Label>
            <Value>
              {treat.preBolus} <Units>min</Units>
            </Value>
          </Container>
        </>
      )}
      {treat.eventType === eventType.EXERCISE && (
        <Container style={{ gridArea: 'content1' }}>
          <Label>Duration</Label>
          <Value>
            {treat.duration}
            <Units>min</Units>
          </Value>
        </Container>
      )}

      {treat.eventType === eventType.RAPID_ACTING && (
        <Container style={{ gridArea: 'content1' }}>
          <Label>Insulin</Label>
          <Value>{treat.insulin}</Value>
        </Container>
      )}

      {treat.eventType === eventType.LONG_ACTING && (
        <Container style={{ gridArea: 'content1' }}>
          <Label>Insulin</Label>
          <Value>{treat.insulin}</Value>
        </Container>
      )}

      {treat.freelibre_sgv && (
        <ProgressT level='title-lg'>
          {sgvToMbg(treat.freelibre_sgv)} → {sgvToMbg(treat.freelibre_sgv_2h)}
        </ProgressT>
      )}
    </GridCard>
  );
}

export default TreatmentCard;

const GridCard = styled(Card)({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, autofill)',
  gridTemplateRows: 'repeat(3, autofill)',
  gridTemplateAreas: `'title title title time' 'note note note .'
    'content1 content2 content3 progress'`,
}) as typeof Card;

const CardTitle = styled('div')({
  gridArea: 'title',
  display: 'flex',
  justifySelf: 'start',
  alignSelf: 'start',
  alignItems: 'center',
});

const TimeT = styled(Typography)({
  gridArea: 'time',
  justifySelf: 'end',
  alignSelf: 'start',
  color: 'var(--joy-palette-text-tertiary, var(--joy-palette-neutral-600, #555E68))',
  fontSize: 'var(--joy-fontSize-sm, 0.875rem)',
  fontWeight: 'var(--joy-fontWeight-md, 400)',
  lineHeight: 'var(--joy-lineHeight-md, 1.5)',
});
const Placeholder = styled(Typography)({
  gridArea: 'note',
  color: 'var(--joy-palette-text-tertiary, var(--joy-palette-neutral-600, #555E68))',
  fontSize: 'var(--joy-fontSize-sm, 0.875rem)',
});
const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'end',
});
const Label = styled(Typography)({
  color: 'var(--joy-palette-text-tertiary, var(--joy-palette-neutral-600, #555E68))',
  fontSize: 'var(--joy-fontSize-sm, 0.875rem)',
  fontWeight: 'var(--joy-fontWeight-md, 500)',
  lineHeight: 'var(--joy-lineHeight-md, 1.5)',
  whiteSpace: 'nowrap',
  marginBottom: '2px',
});
const Units = styled(Typography)({
  color: 'var(--joy-palette-text-tertiary, var(--joy-palette-neutral-600, #555E68))',
  fontSize: 'var(--joy-fontSize-xs, 0.75rem)',
  fontWeight: 'var(--joy-fontWeight-md, 600)',
  lineHeight: 'var(--joy-lineHeight-md, 1.5)',
  whiteSpace: 'nowrap',
});
const Value = styled(Typography)({
  color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #171A1C))',
  fontSize: 'var(--joy-fontSize-lg, 1.125rem)',
  fontWeight: 'var(--joy-fontWeight-xl, 700)',
  lineHeight: 'var(--joy-lineHeight-xs, 1.33334)',
  wordSpacing: '-.2ch',
});
const ProgressT = styled(Typography)({
  gridArea: 'progress',
  placeSelf: 'end',
  whiteSpace: 'nowrap',
  fontWeight: 'var(--joy-fontWeight-xl, 500)',
});
