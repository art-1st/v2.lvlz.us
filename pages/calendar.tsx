import { NextPage } from 'next';
import styled from 'styled-components';
import { Calendar } from 'antd';

const CalendarPage: NextPage = () => {
  return (
    <CalendarContainer>
      <Calendar
        locale={{
          lang: {
            locale: 'ko',
            placeholder: '날짜를 선택하세요',
            rangePlaceholder: ['시작일', '종료일'],
            today: '오늘',
            now: '지금',
            backToToday: '오늘로',
            ok: '확인',
            clear: '초기화',
            month: '월',
            year: '연',
            timeSelect: '시간 선택',
            dateSelect: '날짜 선택',
            monthSelect: '월 선택',
            yearSelect: '연도 선택',
            decadeSelect: '연대 선택',
            yearFormat: 'YYYY',
            dateFormat: 'YYYY-M-D',
            dayFormat: 'D',
            dateTimeFormat: 'YYYY-M-D HH:mm:ss',
            monthFormat: 'MMMM',
            monthBeforeYear: true,
            previousMonth: '지난달 (PageUp)',
            nextMonth: '다음달 (PageDown)',
            previousYear: '작년 (Control + left)',
            nextYear: '내년 (Control + right)',
            previousDecade: '지난 연대',
            nextDecade: '다음 연대',
            previousCentury: '지난 세기',
            nextCentury: '다음 세기',
          },
          timePickerLocale: {
            placeholder: '시간을 선택하세요',
          },
          dateFormat: 'YYYY-MM-DD',
          dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
          weekFormat: 'YYYY-wo',
          monthFormat: 'YYYY-MM',
        }}
      ></Calendar>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  padding: 16px;
`;

export default CalendarPage;
