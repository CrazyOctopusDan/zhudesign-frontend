import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, Button, Tooltip, Image } from 'antd';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { UploadOutlined } from '@ant-design/icons';
import { baseUrl } from '../../utils/request'

const RNDContext = createDndContext(HTML5Backend);

const type = 'DragableUploadList';

const DragableUploadListItem = ({ originNode, moveRow, file, fileList }) => {
  const ref = React.useRef();
  const index = fileList.indexOf(file);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  const errorNode = (
    <Tooltip title="Upload Error" getPopupContainer={() => document.body}>
      {originNode.props.children}
    </Tooltip>
  );

  const normalNode = (
    <Tooltip 
      title={() => <Image src={file.url} />} 
      getPopupContainer={() => document.body}
    >
      {originNode}
    </Tooltip>
  )

  return (
    <div
      ref={ref}
      className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move' }}
    >
      
      {file.status === 'error' ? errorNode : normalNode}
    </div>
  );
};

// Upload
const DragSortingUpload = ({
  limit = 99,
  initFileList = [],
  onFileChange
}) => {
  const [fileList, setFileList] = useState([
    // {
    //   uid: '-1',
    //   name: 'image1.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // }
  ]);
  const [init, setInit] = useState(false)

  useEffect(() => {
    if (initFileList.length && !init) {
      setFileList(initFileList)
      setInit(true)
    }
  }, [initFileList, init])

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = fileList[dragIndex];
      setFileList(
        update(fileList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
      // props向外传递
      onFileChange(
        update(fileList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      )
    },
    // eslint-disable-next-line
    [fileList],
  );

  const manager = useRef(RNDContext);

  const onChange = ({ fileList: newFileList }) => {
    console.log('看看这个新的newFileList是什么', newFileList)

    const _list = newFileList.reduce((acc, item) => {
      if (item['response'] ) {
        if (item['response'].Code !== -1) {
          return [...acc, {
            name: item.name,
            uid: item.response?.data?.uid,
            status: item.status,
            url: item.response?.data?.absoluteUrl || '',
            relatedUrl: item.response?.data?.relatedUrl || ''
          }]
        } else {
          return [...acc]
        }
      } else {
        return [...acc, item]
      }
    }, [])

    console.log('看看这个处理好的FileList是什么', _list)

    setFileList(_list);
    // props向外传递
    onFileChange(_list)
  };

  return (
    <DndProvider manager={manager.current.dragDropManager}>
      <Upload
        action={baseUrl + "/api/artworks/upload"}
        fileList={fileList}
        onChange={onChange}
        multiple
        itemRender={(originNode, file, currFileList) => (
          <DragableUploadListItem
            originNode={originNode}
            file={file}
            fileList={currFileList}
            moveRow={moveRow}
          />
        )}
      >
        { fileList.length < limit ? (
          <Button>
            <UploadOutlined /> 点击上传
          </Button>
        ) : null}
      </Upload>
    </DndProvider>
  );
};

export default DragSortingUpload
