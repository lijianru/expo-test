import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Button, Column, Divider, Heading, Input, Row, Text, useDisclose } from 'native-base';

import { RESUME_STATUS } from '../client/Resume/enum';
import { LFormControl } from '../components/LFormControl';
import { LModal } from '../components/LModal';
import { LScrollView } from '../components/LScrollView';
import { useComponentMountAndUnmount } from '../hooks/useComponentMountAndUnmount';
import { useApproveResume, useResumeDetailInfo } from '../services/resume';
import { ResumeDetailScreenRouteProp } from '../types/navigation';

export function ResumeDetailScreen() {
  useComponentMountAndUnmount('ResumeDetailScreen');

  const { isOpen, onOpen, onClose } = useDisclose();

  const route = useRoute<ResumeDetailScreenRouteProp>();
  const resumeId = route.params.id;

  const [currentInterviewActionId, setCurrentInterviewActionId] = useState('');
  const [comment, setComment] = useState('');

  const { username, job, phone, sex, createdBy, createdDate, closedDate, interviewActionList } =
    useResumeDetailInfo(resumeId);

  const { handleApproveResume, handleUnApproveResume } = useApproveResume(
    currentInterviewActionId,
    resumeId,
    comment
  );

  const handleOpenModal = (interviewActionId: string) => {
    setCurrentInterviewActionId(interviewActionId);
    setComment('');
    onOpen();
  };

  const handleCloseModal = () => {
    setCurrentInterviewActionId('');
    onClose();
  };

  return (
    <LScrollView>
      <Heading>基础信息</Heading>
      <Column>
        <Text p={2}>姓名：{username}</Text>
        <Text p={2}>性别：{sex}</Text>
        <Text p={2}>电话号码：{phone}</Text>
        <Text p={2}>应聘岗位：{job}</Text>
        <Text p={2}>创建时间：{createdDate}</Text>
        <Text p={2}>内推人：{createdBy}</Text>
        <Text p={2}>关闭时间：{closedDate}</Text>
      </Column>
      <Divider m={2} />
      <Heading>简历时间线</Heading>
      <Column ml={4}>
        {interviewActionList.map(
          (
            {
              id,
              interviewProcessId,
              status,
              comment,
              createdDate,
              closedDate,
              updatedBy,
              ownerIds,
            },
            index
          ) => {
            return (
              <Column key={id}>
                <Row justifyContent="space-between" alignItems="center">
                  <Heading size="sm">{interviewProcessId}</Heading>
                  {status === RESUME_STATUS.PENDING && (
                    <Button size="sm" onPress={() => handleOpenModal(id)}>
                      更新
                    </Button>
                  )}
                </Row>
                <Text p={2}>状态：{status}</Text>
                <Text p={2}>评价：{comment}</Text>
                <Text p={2}>创建时间：{createdDate}</Text>
                {closedDate && <Text p={2}>完成时间：{closedDate}</Text>}
                <Text p={2}>操作人：{updatedBy}</Text>
                {status === RESUME_STATUS.PENDING && (
                  <Text p={2}>待处理人：{ownerIds.join(', ')}</Text>
                )}
                {index === interviewActionList.length - 1 && <Divider m={2} />}
              </Column>
            );
          }
        )}
      </Column>
      <LModal
        title="更新简历状态"
        visible={isOpen}
        onClose={handleCloseModal}
        onCancel={() => {
          if (!comment) return;
          handleUnApproveResume();
          handleCloseModal();
        }}
        onSave={() => {
          handleApproveResume();
          handleCloseModal();
        }}
        onCancelText="未通过"
        onSaveText="通过"
      >
        <LFormControl label="评价" helperText="未通过时请填写原因！">
          <Input value={comment} onChangeText={val => setComment(val)} />
        </LFormControl>
      </LModal>
    </LScrollView>
  );
}
