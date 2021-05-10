import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import { navigate } from 'react-big-calendar/lib/utils/constants'
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownloadOutlined, DownOutlined, PrinterOutlined, UserOutlined } from '@ant-design/icons';

class Toolbar extends React.Component {
  render() {
    let {
      localizer: { messages },
      label,
    } = this.props
    
    function handleButtonClick(e) {
      message.info('Click on left button.');
      console.log('click left button', e);
    }
    
    function handleMenuClick(e) {
      message.info('Click on menu item.');
      console.log('click', e);
    }
    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="1" onClick={() => window.print()}icon={<PrinterOutlined/>}>
          Print
        </Menu.Item>
        <Menu.Item key="2" icon={<DownloadOutlined/>}>
          Download
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            {messages.previous}
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            {messages.next}
          </button>
        </span>

        <span className="rbc-toolbar-label">{label}</span>
        
        <span className="rbc-btn-group">{this.viewNamesGroup(messages)}</span>
        <Dropdown overlay={menu}>
        <button    trigger={['click']}><DownOutlined/></button>
        </Dropdown>
      </div>
    )
  }

  navigate = action => {
    this.props.onNavigate(action)
  }

  view = view => {
    this.props.onView(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <button
          type="button"
          key={name}
          className={clsx({ 'rbc-active': view === name })}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ))
    }
  }
}

Toolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
}

export default Toolbar