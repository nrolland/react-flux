function hsreact$mk_ctrl_view(name, store, renderCb) {
    return React['createClass']({
        'displayName': name,
        'getInitialState': function() {
            return store.sdata;
        },
        _onViewChange: function(x) { // allows binding to this
            this['setState'](x);
        },
        'shouldComponentUpdate': function(newProps, newState) {
            return this['props'].hs.root != newProps.hs.root || this['state'].root != newState.root;
        },
        'componentDidMount': function() {
            store.views.push(this._onViewChange);
        },
        'componentWillUnmount': function() {
            var idx = store.views.indexOf(this._onViewChange);
            if (idx >= 0) { store.views.splice(idx, 1); }
            this._currentCallbacks.map(h$release);
            h$release(this['props'].hs);
        },
        'componentWillReceiveProps': function() {
            h$release(this['props'].hs);
        },
        'render': function() {
            var arg = {
                state: this['state'],
                props: this['props'].hs,
                newCallbacks: [],
                elem:null
            };
            renderCb(arg);
            this._currentCallbacks.map(h$release);
            this._currentCallbacks = arg.newCallbacks;
            return arg.elem;
        },
        _currentCallbacks: []
    });
}

function hsreact$mk_view(name, renderCb) {
    return React['createClass']({
        'displayName': name,
        'componentWillUnmount': function() {
            this._currentCallbacks.map(h$release);
            h$release(this['props'].hs);
        },
        'shouldComponentUpdate': function(newProps, newState) {
            return this['props'].hs.root != newProps.hs.root;
        },
        'componentWillReceiveProps': function() {
            h$release(this['props'].hs);
        },
        'render': function() {
            var arg = {
                props: this['props'].hs,
                newCallbacks: [],
                elem:null
            };
            renderCb(arg);
            this._currentCallbacks.map(h$release);
            this._currentCallbacks = arg.newCallbacks;
            return arg.elem;
        },
        _currentCallbacks: []
    });
}

function hsreact$mk_stateful_view(name, initialState, renderCb) {
    return React['createClass']({
        'displayName': name,
        'getInitialState': function() {
            return { hs: initialState };
        },
        'shouldComponentUpdate': function(newProps, newState) {
            return this['props'].hs.root != newProps.hs.root || this['state'].hs.root != newState.hs.root;
        },
        'componentWillUnmount': function() {
            this._currentCallbacks.map(h$release);
            h$release(this['props'].hs);
            h$release(this['state'].hs);
        },
        'componentWillReceiveProps': function() {
            h$release(this['props'].hs);
        },
        'render': function() {
            var that = this;
            var arg = {
                state: this['state'].hs,
                props: this['props'].hs,
                newCallbacks: [],
                elem:null,
                alterState: {
                    getState: function() { return that['state'].hs; },
                    setState: function(s) {
                        h$release(that['state'].hs);
                        that['setState']({hs: s});
                    }
                }
            };
            renderCb(arg);
            this._currentCallbacks.map(h$release);
            this._currentCallbacks = arg.newCallbacks;
            return arg.elem;
        },
        _currentCallbacks: []
    });
}