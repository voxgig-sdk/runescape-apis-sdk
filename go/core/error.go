package core

type RunescapeApisError struct {
	IsRunescapeApisError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewRunescapeApisError(code string, msg string, ctx *Context) *RunescapeApisError {
	return &RunescapeApisError{
		IsRunescapeApisError: true,
		Sdk:              "RunescapeApis",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *RunescapeApisError) Error() string {
	return e.Msg
}
