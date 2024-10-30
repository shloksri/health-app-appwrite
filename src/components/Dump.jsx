import { loginWithGoogle } from '../appwrite/authappwrite.js'
import './Login.css'
const Login = () => {
    return (
        <div class="box">

            <div class="u-flex u-main-center u-width-fit-content card">
                <table class="table u-text-center">
                    <thead class="table-thead">
                        <tr class="table-row">
                            <th class="table-thead-col"><span class="eyebrow-heading-3">Filename</span></th>
                            <th class="table-thead-col">
                                <p class="eyebrow-heading-3">CHange</p>
                            </th>
                        </tr>
                    </thead>
                </table>

            </div>
            <table class="table is-selected-columns-mobile u-text-center">
                <thead class="table-thead">
                    <tr class="table-row">
                        <th class="table-thead-col" id='table-left'><span class="eyebrow-heading-3">Filename</span></th>
                        <th class="table-thead-col is-only-desktop">
                            <p class="eyebrow-heading-3">Type</p>

                        </th>
                    </tr>
                </thead>
            </table>

            <div class="u-flex u-main-center u-min-width-50-percent card">

                <div class="card u-margin-auto">
                    <div class="grid-item-1">
                        <div class="grid-item-1-start-start">
                            <div class="eyebrow-heading-3">sub-header</div>
                            <h2 class="heading-level-6 u-margin-block-start-4">Header</h2>
                            <p class="u-flex u-cross-baseline u-gap-4 u-margin-block-start-16">
                                <span class="icon-exclamation u-color-text-warning" aria-hidden="true"></span>
                                <span class="u-color-light-only-text-neutral-70 u-color-dark-only-text-neutral-50">
                                    All services disabled
                                </span>
                            </p>
                        </div>
                        <div class="grid-item-1-start-end">
                            <div class="status is-complete">
                                <span class="status-icon"></span>
                                <span class="text">Complete</span>
                            </div>
                        </div>
                        <div class="grid-item-1-end-start">
                            <div class="u-flex u-gap-16 u-flex-wrap">
                                <div class="tag">
                                    <span class="icon-duplicate" aria-hidden="true"></span>
                                    <span class="text">Interactive</span>
                                </div>
                            </div>
                        </div>
                        <div class="grid-item-1-end-end">
                            <ul class="icons u-flex u-gap-8">
                                <li>
                                    <span
                                        class="icon-lock-closed"
                                        aria-hidden="true"
                                        aria-label="Secure [OR] unsecure"
                                    ></span>
                                </li>
                                <li>
                                    <span class="icon-shield-check" aria-hidden="true" aria-label="Safe [OR] unsafe"></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="card u-margin-auto">
                    <div class="grid-item-1">
                        <div class="grid-item-1-start-start">
                            <div class="eyebrow-heading-3">sub-header</div>
                            <h2 class="heading-level-6 u-margin-block-start-4">Header</h2>
                            <p class="u-flex u-cross-baseline u-gap-4 u-margin-block-start-16">
                                <span class="icon-exclamation u-color-text-warning" aria-hidden="true"></span>
                                <span class="u-color-light-only-text-neutral-70 u-color-dark-only-text-neutral-50">
                                    All services disabled
                                </span>
                            </p>
                        </div>
                        <div class="grid-item-1-start-end">
                            <div class="status is-complete">
                                <span class="status-icon"></span>
                                <span class="text">Complete</span>
                            </div>
                        </div>
                        <div class="grid-item-1-end-start">
                            <div class="u-flex u-gap-16 u-flex-wrap">
                                <div class="tag">
                                    <span class="icon-duplicate" aria-hidden="true"></span>
                                    <span class="text">Interactive</span>
                                </div>
                            </div>
                        </div>
                        <div class="grid-item-1-end-end">
                            <ul class="icons u-flex u-gap-8">
                                <li>
                                    <span
                                        class="icon-lock-closed"
                                        aria-hidden="true"
                                        aria-label="Secure [OR] unsecure"
                                    ></span>
                                </li>
                                <li>
                                    <span class="icon-shield-check" aria-hidden="true" aria-label="Safe [OR] unsafe"></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card u-margin-auto">
                <div class="grid-item-1">
                    <div class="grid-item-1-start-start">
                        <div class="eyebrow-heading-3">sub-header</div>
                        <h2 class="heading-level-6 u-margin-block-start-4">Header</h2>
                        <p class="u-flex u-cross-baseline u-gap-4 u-margin-block-start-16">
                            <span class="icon-exclamation u-color-text-warning" aria-hidden="true"></span>
                            <span class="u-color-light-only-text-neutral-70 u-color-dark-only-text-neutral-50">
                                All services disabled
                            </span>
                        </p>
                    </div>
                    <div class="grid-item-1-start-end">
                        <div class="status is-complete">
                            <span class="status-icon"></span>
                            <span class="text">Complete</span>
                        </div>
                    </div>
                    <div class="grid-item-1-end-start">
                        <div class="u-flex u-gap-16 u-flex-wrap">
                            <div class="tag">
                                <span class="icon-duplicate" aria-hidden="true"></span>
                                <span class="text">Interactive</span>
                            </div>
                        </div>
                    </div>
                    <div class="grid-item-1-end-end">
                        <ul class="icons u-flex u-gap-8">
                            <li>
                                <span
                                    class="icon-lock-closed"
                                    aria-hidden="true"
                                    aria-label="Secure [OR] unsecure"
                                ></span>
                            </li>
                            <li>
                                <span class="icon-shield-check" aria-hidden="true" aria-label="Safe [OR] unsafe"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="u-flex u-main-center u-min-width-100-percent card">
                <div class="box">1</div>
                <div class="box">2</div>
                <div class="box">3</div>
            </div>

            <div class="u-flex u-main-center u-column-gap-32">
                <div class="box">1</div>
                <div class="box">2</div>
            </div>


            <div class="u-flex u-main-center u-min-width-100-percent card">
                <div class="box">1</div>
                <div class="box">2</div>
                <div class="box">3</div>
            </div>

            <div class="u-flex u-main-center u-column-gap-32">
                <div class="box">1</div>
                <div class="box">2</div>
            </div>



            <div class="box u-main-center u-min-width-100-percent card">

                <button className='button' id='b1'>
                    <span className='text'>Primary</span>
                </button>
                <br />

                <br />
                <button className="button" onClick={loginWithGoogle}>
                    <span className="icon-google"></span> <span className="text is-secondary">Login with Google</span>

                </button>
            </div>

        </div>


    )
}

export default Login