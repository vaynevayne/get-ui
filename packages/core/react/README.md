### 楔子
灵活性第一, 越简单越好

目前前端组件库很多,但是多多少少有些问题
比如: 
1. antd 铁板一块,且自定义行为太多且不支持撤销,而且样式很难修改,比如 select
2. mantine-ui 组件太简陋, 功能太少

灵活性是指: 
1. 修改样式,
2. 撤销组件内部的自定义行为
3. 方便的访问组件内部状态, 比如很多 select 组件在内部保存一份 filter 数据,但是外界无法访问,  解决方案:参考aria-state
4. dom 层面, 提供足够多的 slot, 比如 按钮的 icon, 需要抽象到 slot 级别 
5. 逻辑方面, 提供足够多的 hook, 比如 table 在内部排序之后,渲染前可以再次修改数据
6. 牺牲性能, 保证源码简洁,逻辑清晰,方便阅读,利于扩展

此项目提供的组件, 保证用户方便扩展的前提下,提供足够多的功能, 另外寻找成熟且功能足够丰富的 hook 库,基于它来封装组件,比如 
[@tanstack/react-table](https://tanstack.com/table/v8) 
[downshift](https://www.downshift-js.com/)
[floating-u](https://floating-ui.com/docs/getting-started)

### 开发步骤

安装依赖: `pnpm install --hoist` , --hoist 是必须的
启动项目: `pnpm sb`,  会启动 storybook,不需要预先 build 项目

组件文档: 后期使用 [nextra](https://nextra.site/)  + [sandpack](https://sandpack.codesandbox.io/)

 node 版本管理 替换为 volta, 就不需要每次都执行 nvm use